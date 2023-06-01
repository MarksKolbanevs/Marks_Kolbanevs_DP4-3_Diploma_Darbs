import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:monle/resources/socket.client.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';

class HistoryRequests{
  final _socketClient = SocketClient.instance.socket!;

  Future<bool> createHistory(String tagUuid) async {

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    final userPosition = await getUserPosition();

    var url = Uri.parse('https://monleapi.onrender.com/history');

    var body = {
      "tagUuid":tagUuid,
      "latitude":userPosition.latitude,
      "longitude":userPosition.longitude,
    };

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.post(url, headers: headers, body: jsonEncode(body));

    if(response.statusCode == 201){
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      return true;
    }else{
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  Future<List<dynamic>> showHistory() async{

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/history');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data;
    } else {
      throw Exception('Response status: ${response.statusCode}');
    }
  }
}

 Future<dynamic> getUserPosition() async{
  try{
    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    return position;
  } catch (e) {
    print(e);
  }
 }