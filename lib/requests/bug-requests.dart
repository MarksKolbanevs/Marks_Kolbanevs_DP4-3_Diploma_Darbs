import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:monle/utils/widgets/toast-messages/toast-successed-message.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BugRequests{
  Future<void> reportBug(BuildContext context, String title,String bug) async {
    var url = Uri.parse('https://monleapi.onrender.com/bug');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var body = {
      "title":title,
      "bug":bug
    };

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.post(url, headers: headers, body: jsonEncode(body));

    if(response.statusCode == 201){
      toastSuccessedMessage(context, 'Bug reported');
      Navigator.pop(context);
    }else{
      toastSuccessedMessage(context, 'There was an error');
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }

  }
}