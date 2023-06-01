import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:http/http.dart' as http;
import 'package:monle/navigation.dart';
import 'package:monle/resources/socket.client.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/toast-messages/toast-error-message.dart';
import 'package:monle/utils/widgets/toast-messages/toast-successed-message.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../ble/ble-connection-notifier.dart';

class TagRequests {
  final _socketClient = SocketClient.instance.socket!;

  Future<void> createTag(BuildContext context, String uuid, String name, bool condition, String photo) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/tag');

    //Gettings id of the bag
    final bag = await bagRequests.getBag();
    final bagId = bag['_id'];
    final body = {
      "bag": bagId,
      "uuid": uuid,
      "name": name,
      "photo": photo,
      "condition": condition
    };

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };

    var response = await http.post(url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 201) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => Navigation()),
      );
    } else {
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Stream<List<dynamic>> showTags(BuildContext context,String filter) {
    // Create a stream controller
    StreamController<List<dynamic>> controller = StreamController<List<dynamic>>();

    //Get serviceUuiid
    final bagUuid = Provider.of<BleConnectionNotifier>(context, listen: false).getServiceUuid();

    final body = {
      'uuid':bagUuid.toString(),
      'filter':filter,
    };
    // Emit the 'showTags' event
    _socketClient.emit("showTags", body);

    // Register a callback for the 'tagsData' event
    _socketClient.on('tagsData', (tags) {
      // Add the received tags data to the stream
      controller.add(tags);
    });

    // Return the stream from the controller
    return controller.stream;
  }

  Future<bool> updateTag(String uuid, bool condition) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/tag');
    var body = {
      "uuid": uuid,
      "condition": condition
    };

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };

    var response = await http.patch(
        url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 201) {
      print('Tag updated succesfully');
      return true;
    } else {
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  Future<void> callibrateTag(String uuid, BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/tag/callibrate');
    var body = {
      "uuid": uuid,
    };

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };

    var response = await http.patch(
        url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 201) {
      toastSuccessedMessage(context, 'Item callibrated');
    } else {
      toastErrorMessage(context, 'Could not callibrate item');
    }
  }

  Future<void> updateTagData(String uuid, String name, BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/tag/update');
    var body = {
      "uuid": uuid,
      "name": name,
    };

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };

    var response = await http.patch(
        url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 200) {
      toastSuccessedMessage(context, 'Item updated');
      print('Tag updated succesfully');
    } else {
      toastErrorMessage(context, 'Could not update item');
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Future<void> updateTagPhoto(BuildContext context, String uuid, String photo) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/tag/update/photo');
    var body = {
      "uuid": uuid,
      "photo": photo,
    };

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };

    var response = await http.patch(
        url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 200) {
      toastSuccessedMessage(context, 'Item updated');
    } else {
      toastErrorMessage(context, 'Could not update photo');
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  Future<void> deleteTag(String uuid, BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('jwt_token');

    var url = Uri.parse('https://monleapi.onrender.com/tag');

    var body = {
      "uuid": uuid,
    };

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };

    var response = await http.delete(
        url, headers: headers, body: jsonEncode(body));

    if (response.statusCode == 201) {
      toastSuccessedMessage(context, 'Tag deleted');
      print('Tag deleted succesfully');
    } else {
      toastErrorMessage(context, 'Tag deleted');
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }
}

  // Future<List<dynamic>> getTagsWithBag(BuildContext context) async {
  //
  //   SharedPreferences prefs = await SharedPreferences.getInstance();
  //   var token = prefs.getString('jwt_token');
  //
  //   //Setting service uuid to notifier
  //   final bagUuid = Provider.of<BleConnectionNotifier>(context, listen: false).getServiceUuid();
  //
  //   final params = {
  //     "bagUuid":bagUuid.toString(),
  //   };
  //
  //   var url = Uri.http('192.168.8.100:8000', '/tag/bag', params);
  //
  //   var headers = {'Content-Type': 'application/json','Authorization': 'Bearer $token'};
  //
  //   var response = await http.get(url, headers: headers);
  //
  //   var responseBody = jsonDecode(response.body);
  //
  //   if(response.statusCode == 200){
  //     return responseBody;
  //   }else{
  //     print('Response status: ${response.statusCode}');
  //     print('Response body: ${response.body}');
  //     return responseBody;
  //   }
  // }