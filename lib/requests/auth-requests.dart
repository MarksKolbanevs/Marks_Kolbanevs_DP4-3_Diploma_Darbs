import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:http/http.dart' as http;
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/toast-messages/toast-successed-message.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../ble/ble-connection-notifier.dart';
import '../navigation.dart';
import '../pages/new-bag-page.dart';

class AuthRequests{
  Future<dynamic> signup(BuildContext context, String email, String name, String password) async {
    var url = Uri.parse('https://monleapi.onrender.com/auth/signup');

    var body = {
      "email": email,
      "name": name,
      "password": password,
    };
    var headers = {'Content-Type': 'application/json'};
    var response = await http.post(
        url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 201) {
      //Getting and saving JWT token
      var token = json.decode(response.body)['token'];
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('jwt_token', token);
      //Redirecting to new bag page
      Navigator.pushNamed(context, '/new-bag');
    }else{

    }
  }

  Future<dynamic> sendForVerify(BuildContext context,String email) async {
    var url = Uri.parse('https://monleapi.onrender.com/auth/send-verify?email='+email);

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.get(url, headers: headers);

    if (response.statusCode == 201) {
      toastSuccessedMessage(context,response.body);
    }
  }


  Future<void> login(BuildContext context, String email, String password,bool checkboxValue) async {

    var queryParameters = {
      "email": email,
      "password": password,
    };

    final url = Uri.https('monleapi.onrender.com', '/auth/login', queryParameters);

    var headers = {'Content-Type': 'application/json'};

    //Sending for user
    var response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      //Getting and saving JWT token
      var token = json.decode(response.body)['token'];
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('jwt_token', token);
      //Set the remember state
      await prefs.setBool('remembered', checkboxValue);

      //Getting user by his token
      final user = await userRequests.getUser();

      //Checking if user added his first bag
      final userValidated = user['validationPassed'];

      //Gettings id of the bag
      final notConvertedUuid = await bagRequests.getUuid();

      if(notConvertedUuid != null){
        final Uuid bagUuid = Uuid.parse(await bagRequests.getUuid());
        //Setting service UUID and start scanning for the bag
        Provider.of<BleConnectionNotifier>(context, listen: false).setServiceUuid(bagUuid);
        Provider.of<BleConnectionNotifier>(context, listen: false).startScan();
      }

      Navigator.pushNamed(context, '/navigation');
      return;
    } else {
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Future<void> checkForJwtToken(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if(prefs.getString('jwt_token') != null && prefs.getBool('remembered') == true){
      //Gettings id of the bag
      final bag = await bagRequests.getBag();
      final Uuid bagUuid = Uuid.parse(bag['uuid']);

      //Setting service uuid to notifier
      Provider.of<BleConnectionNotifier>(context, listen: false).setServiceUuid(bagUuid);

      //Navigating to home page
      Provider.of<BleConnectionNotifier>(context, listen: false).startScan();

      //Redirecting to the navigation
      Navigator.pushNamed(context, '/navigation');
    }
  }

  Future<void> clearJwtToken(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //Deleting jwt tocken
    await prefs.remove('jwt_token');
    //Deleting remember state
    await prefs.remove('remembered');
    //Redirecting to the navigation
    Navigator.pushNamed(context, '/login');
    }
  }
