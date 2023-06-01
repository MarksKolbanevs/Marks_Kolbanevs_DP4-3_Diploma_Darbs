import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:monle/pages/bottom-navigation/settings/help/room-page.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HelpRequests{
  Future<void> createRoom(BuildContext context) async {
    var url = Uri.parse('https://monleapi.onrender.com/help/room');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.post(url, headers: headers);

    if(response.statusCode == 201){
      Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => RoomPage())
      );
    }else{
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }
}