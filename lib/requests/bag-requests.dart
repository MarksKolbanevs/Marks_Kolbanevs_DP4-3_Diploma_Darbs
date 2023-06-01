import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:http/http.dart' as http;
import 'package:monle/pages/bag-scanning-page.dart';
import 'package:monle/pages/new-item-page.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../ble/ble-connection-notifier.dart';

class BagRequests{

  Future<void> createBag(BuildContext context,String uuid) async {
    var url = Uri.parse('https://monleapi.onrender.com/bag');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var body = {
      "uuid":uuid,
    };

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.post(url, headers: headers, body: jsonEncode(body));

    if(response.statusCode == 201){
      //Redirecting to the navigation
      Navigator.pushNamed(context, '/bag-scanning');
    }else{
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Future<void> checkForBagUuid(BuildContext context,Uuid uuid) async {

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var queryParameters = {
      "uuid": uuid.toString(),
    };

    final url = Uri.http('https://monleapi.onrender.com', '/bag/uuid/check', queryParameters);

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.get(url, headers: headers);

    if(response.statusCode == 200){
      Provider.of<BleConnectionNotifier>(context, listen: false).setServiceUuid(uuid);
      //Redirecting to the navigation
      Navigator.pushNamed(context, '/bag-scanning');
    }else if(response.statusCode == 404) {
      bagNotFoundForUserAlert(context);
    }
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }

  void bagNotFoundForUserAlert(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Ahahhaah'),
          content: Column(
            children: const [
              Icon(
                Icons.emoji_emotions_outlined,
                size: 150,
                weight: 5,
              ),
              Text('Bag was not registered for this user')
            ],
          ),
          actions: const <Widget>[],
        );
      },
    );
  }


  Future<Map<String, dynamic>> getBag() async {
    var url = Uri.parse('https://monleapi.onrender.com/user/bag');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.get(url, headers: headers);

    var responseBody = jsonDecode(response.body);

    if(response.statusCode == 200){
      print(responseBody);
      return responseBody;
    }else {
      // If the server did not return a 200 OK response, throw an error.
      throw Exception('Response status: ${response.statusCode}');
    }
  }

  Future<Uint8List> getPhoto() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    var token = prefs.getString('jwt_token');

    final uri = Uri.parse('https://monleapi.onrender.com/user/bag/photo');
    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};
    final response = await http.get(uri,headers: headers);

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response, parse the JSON.
      final data = jsonDecode(response.body);
      Uint8List photoBytes = base64.decode(data);
      return photoBytes;
    } else {
      // If the server did not return a 200 OK response, throw an error.
      throw Exception('Response status: ${response.statusCode}');
    }
  }

  Future<dynamic> getUuid() async {
    var url = Uri.parse('https://monleapi.onrender.com/user/bag/uuid');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.get(url, headers: headers);

    var responseBody = jsonDecode(response.body);
    if(response.statusCode == 200){
      return responseBody;
    }else{
      return null;
    }
  }

}