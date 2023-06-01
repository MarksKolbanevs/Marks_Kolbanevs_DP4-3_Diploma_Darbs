import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:monle/pages/auth/login-page.dart';
import 'package:monle/resources/socket.client.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SocketMethods{
  final _socketClient = SocketClient.instance.socket!;

  void createRoom() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final userJwt = prefs.getString('jwt_token')!;

    if(userJwt.isNotEmpty){
      _socketClient.emit('createRoom', {'user':userJwt});
    }
  }

  void joinRoom(String nickname,String roomID){
    if(nickname.isNotEmpty && roomID.isNotEmpty){
      _socketClient.emit('joinRoom',{
        'nickname':nickname,
        'roomid':roomID,
      });
    }
  }

  void createRoomSuccessListener(BuildContext context){
    _socketClient.on('createRoomSuccess',(room){
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => LoginPage()),
      );
    });
  }
}