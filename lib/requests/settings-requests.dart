import 'dart:convert';

import 'package:http/http.dart' as http;

class SettingsRequests{
  Future<void> reportBug(String bug,String title) async{
    var url = Uri.parse('https://monleapi.onrender.com/settings/bug');
    var body = {
      "bug":bug,
      "title":title
    };
    var headers = {'Content-Type': 'application/json'};
    var response = await http.post(url, headers: headers, body: jsonEncode(body));

    if(response.statusCode == 201){
      // Navigator.of(context).pushReplacement(
      //   MaterialPageRoute(builder: (context) => Navigation()),
      // );
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }else{
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
    }
  }

  // Future<void> sendMessage(){
  //
  // }

  // void joinRoom(String nickname,String roomID){
  //   if(nickname.isNotEmpty && roomID.isNotEmpty){
  //     _socketClient.emit('joinRoom',{
  //       'nickname':nickname,
  //       'roomid':roomID,
  //     });
  //   }
  // }
}