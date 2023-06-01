import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'dart:async';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:monle/utils/globals.dart';
import 'package:flutter_blue/flutter_blue.dart';

class PermissionChecker{
  StreamSubscription<bool>? _adapterStatusSubscription;
  FlutterBlue flutterBlue = FlutterBlue.instance;

  bool _locationPermission = false;
  bool _bluetoothPermission = false;


  Future<bool> checkForLocationPermission() async {
    LocationPermission permission;

    // Check if location services are enabled
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();

    if (!serviceEnabled) {
      _locationPermission = false;
      return false;
    }

    // Check if the app has permission to access location services
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.deniedForever) {
      _locationPermission = false;
      return false;
    }

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission != LocationPermission.whileInUse && permission != LocationPermission.always) {
        _locationPermission = false;
        return false;
      }
    }

    _locationPermission = true;
    return true;
  }

  Future<bool> checkForBluetoothPermission() async {
    final bluetoothStatus = await flutterBlue.isOn;
    if(bluetoothStatus){
      _bluetoothPermission = true;
      return true;
    }else{
      _bluetoothPermission = false;
      return false;
    }
  }
}

class BleConnectionNotifier with ChangeNotifier{
  //final BleCharacteristicNotifier _bleCharacteristicNotifier = BleCharacteristicNotifier();
  late DiscoveredDevice _ubiqueDevice;
  final _flutterReactiveBle = FlutterReactiveBle();
  late StreamSubscription<DiscoveredDevice> _scanStream;
  bool _connected = false;
  bool _tagPresence = true;

  DeviceConnectionState _connectionState = DeviceConnectionState.connecting;
  var _serviceUuid = Uuid.parse("00000000-0000-0000-0000-000000000000");
  final Uuid characteristicUuid = Uuid.parse("beb5483e-36e1-4688-b7f5-ea07361b26a8");
  late QualifiedCharacteristic _rxCharacteristic;


  bool get connected => _connected;
  bool get tagPresence => _tagPresence;
  DeviceConnectionState get connectionState => _connectionState;
  Uuid get serviceUuid => _serviceUuid;

  Future<void> startScan() async {
    final PermissionChecker permissionChecker = PermissionChecker();
    final locationPermission = await permissionChecker.checkForLocationPermission();
    final bluetoothPermission = await permissionChecker.checkForBluetoothPermission();

    if(!locationPermission){
      print('Turn on locations!');
      return;
    }

    if(!bluetoothPermission){
      print('Turn on bluetooth!');
      return;
    }

    _scanStream = _flutterReactiveBle.scanForDevices(withServices: [serviceUuid]).listen((device) async {
      _ubiqueDevice = device;
      _connectToDevice();
    });
  }

  void _connectToDevice() {
    _scanStream.cancel();
    final subscription = _flutterReactiveBle.connectToAdvertisingDevice(
      id: _ubiqueDevice.id,
      withServices: [serviceUuid],
      prescanDuration: const Duration(seconds: 10),
      connectionTimeout: const Duration(seconds: 10),
    ).listen((event) {
      if (event.connectionState == DeviceConnectionState.connected) {
        _rxCharacteristic = QualifiedCharacteristic(
          serviceId: serviceUuid,
          characteristicId: characteristicUuid,
          deviceId: _ubiqueDevice.id,
        );
        _connected = true;
        notifyListeners();
        _connectionState = event.connectionState;
        notifyListeners();
        //_bleCharacteristicNotifier.listenForData(_rxCharacteristic);
        listenForData(_rxCharacteristic);
      }
    });
  }

  void setConnectedState(bool connected){
    _connected = connected;
    notifyListeners();
  }
  void setServiceUuid(Uuid serviceUuid){
    _serviceUuid = serviceUuid;
    notifyListeners();
  }

  //

  //final flutterReactiveBle = FlutterReactiveBle();
  List<String> _rxCharacteristicData = [];
  String _message = "";

  String get message => _message;

  List<String> get rxCharacteristicData => _rxCharacteristicData;

  Future<void> listenForData(_rxCharacteristic) async{
    print('Connected and ready to listen for data');
    StreamSubscription<List<int>>? _dataSubscription;
    var decodedData; // Data decoded from ASCII
    //Receiving UID from tag
    _dataSubscription = await _flutterReactiveBle.subscribeToCharacteristic(_rxCharacteristic).listen((data) async{
      decodedData = const AsciiDecoder().convert(data);
      if(_rxCharacteristicData.length > 1) {
        _rxCharacteristicData.clear();
      }
      _rxCharacteristicData.add(decodedData);
      if(_rxCharacteristicData.length == 2) {
        //Notify listeners for new data
        _rxCharacteristicData;
        notifyListeners();
        //Update data in the database

        final uuid = _rxCharacteristicData[0];
        final condition = _rxCharacteristicData[1].toLowerCase() == "true";

        final updateAndCheckForPresence = await tagRequests.updateTag(uuid, condition);

        if(updateAndCheckForPresence){
          print('tag presented');
          _tagPresence = true;
          notifyListeners();
        }else{
          print('tag not presented');
          _tagPresence = false;
          notifyListeners();
        }

        tagRequests.updateTag(uuid, condition);
        historyRequests.createHistory(uuid);

      }
    }, onError: (dynamic error) {
      //context.read<BleConnectionProvider>().setMessage('There was an error while reading a data');
    });
  }

  void setMessage(String message){
    _message = message;
    notifyListeners();
  }

  void setRXCharacteristics(List<String> arduinoData){
    _rxCharacteristicData = arduinoData;
    notifyListeners();
  }

  Uuid getServiceUuid(){
    return _serviceUuid;
  }

  bool getTagAvailability() {
    return _tagPresence;
  }

  void setTagAvailability(bool availability){
    _tagPresence = availability;
    notifyListeners();
  }

  void clearRXCharacteristics(){
    _rxCharacteristicData = [];
    print('Data cleared');
    //notifyListeners();
  }
}
