import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:monle/ble/ble-connection-notifier.dart';
import 'package:monle/utils/globals.dart';
import 'package:provider/provider.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

class NewBagPage extends StatefulWidget {
  const NewBagPage({Key? key}) : super(key: key);

  @override
  _NewBagPageState createState() => _NewBagPageState();
}

class _NewBagPageState extends State<NewBagPage> {
  //
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;
  bool scanForBarcode = false;

  late StreamSubscription<Barcode> _streamBarcode;
  var bagUuid;

  void _onQRViewCreated(QRViewController controller) async{
    _streamBarcode = controller.scannedDataStream.listen((scanData) async {

        // Do something with the QR code data, e.g. navigate to a new screen
        if(scanData.code!.isNotEmpty){

          setState(() {
            bagUuid = Uuid.parse(scanData.code!);
            scanForBarcode = false;
          });

          _streamBarcode.cancel();

          //Setting service uuid to notifier

          bagRequests.checkForBagUuid(context, bagUuid);

          print('Scanned QR code: ${scanData.code}');
        }

    });
  }

  @override
  void dispose() {
    _streamBarcode.cancel();
    controller?.dispose();
    controller?.stopCamera();
    super.dispose();
    print('dispose worked');
  }

  TextEditingController stuffController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return Scaffold(
        body: SafeArea(
            child: scanForBarcode ? Container(
              height: screenSize.height,
              width: screenSize.width,
              child: QRView(
                key: qrKey,
                onQRViewCreated: _onQRViewCreated,
              ),
            ):
            Center(
              child:Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Text('TAP TO SCAN', style: Theme.of(context).textTheme.displayLarge),
                  SizedBox(height: 50),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Theme.of(context).colorScheme.secondary,
                        width: 1.0,
                      ),
                      borderRadius: BorderRadius.circular(1000.0),
                    ),
                    child:Padding(
                      padding: EdgeInsets.all(24.0),
                      child:TextButton(
                        onPressed: () {
                          setState(() {
                            scanForBarcode = true;
                          });
                        },
                        style: ButtonStyle(
                          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                            RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(1000),
                              //side: BorderSide(color: Theme.of(context).colorScheme.secondary),
                            ),
                          ),
                          backgroundColor: MaterialStateProperty.all<Color>(Theme.of(context).colorScheme.tertiary),
                          elevation: MaterialStateProperty.all<double>(4), // Adding an elevation of 4
                          shadowColor: MaterialStateProperty.all<Color>(Colors.black), // Adding shadow color
                        ),
                        child: Container(
                          width: 270,
                          height: 270,
                          child: Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: <Widget>[
                                Image.asset('assets/qr-code.png', height: 150, width: 150,color: Theme.of(context).colorScheme.primary.withOpacity(0.8)),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 50),
                  SizedBox(
                    width: 195,
                    child:Text('We need QR code of the bag to continue', style: Theme.of(context).textTheme.displaySmall,textAlign: TextAlign.center),
                  ),
                ],
              ),
            ),
        )
    );
  }
}