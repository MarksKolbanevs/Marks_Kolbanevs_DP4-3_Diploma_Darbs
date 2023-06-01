import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:monle/utils/widgets/toast-messages/toast-error-message.dart';
import 'package:monle/utils/widgets/toast-messages/toast-successed-message.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserRequests {

  Future<void> updateUser(Map<String, String> formData, BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    var token = prefs.getString('jwt_token');

    var body = formData ;

    var url = Uri.parse('https://monleapi.onrender.com/user');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.patch(url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 200) {
      toastSuccessedMessage(context, 'Profile updated!');
      Navigator.pop(context);
    } else {
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Future<void> uploadPhoto(BuildContext context) async{
    SharedPreferences prefs = await SharedPreferences.getInstance();

    var token = prefs.getString('jwt_token');

    final imageFile = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (imageFile == null) return;

    final bytes = await imageFile.readAsString();

    var url = Uri.parse('https://monleapi.onrender.com/user/photo');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var body = bytes;

    var response = await http.patch(url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 200) {
      toastSuccessedMessage(context, 'Profile updated!');
      Navigator.pop(context);
    } else {
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }

  }

  Future<Map<String, dynamic>> getUser() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    var token = prefs.getString('jwt_token');

    final uri = Uri.parse('https://monleapi.onrender.com/user');
    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    final response = await http.get(uri,headers: headers);

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response, parse the JSON.
      final data = jsonDecode(response.body);
      return data;
    } else {
      // If the server did not return a 200 OK response, throw an error.
      throw Exception('Response status: ${response.statusCode}');
    }
  }

  Future<Uint8List> getPhoto() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    var token = prefs.getString('jwt_token');

    final uri = Uri.parse('https://monleapi.onrender.com/user/photo');
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

  Future<void> createBag(BuildContext context,String uuid) async {
    var url = Uri.parse('https://monleapi.onrender.com/user/bag');

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

  Future<dynamic> getBag() async {
    var url = Uri.parse('https://monleapi.onrender.com/user/bag');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    var response = await http.get(url, headers: headers);

    var responseBody = jsonDecode(response.body);

    if(response.statusCode == 200){
      return responseBody;
    }else{
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Future<dynamic> changePassword(BuildContext context, String currentPassword, String newPassword ) async{

    final url = Uri.parse('https://monleapi.onrender.com/user/password');
    final body = {
      'currentPassword':currentPassword,
      'newPassword':newPassword
    };
    
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('jwt_token');

    final headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};

    final response = await http.patch(url, headers: headers, body:jsonEncode(body));

    if(response.statusCode == 200){
      toastSuccessedMessage(context, response.body);
    }else{
      toastErrorMessage(context, response.body);
    }
  }
}