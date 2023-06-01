import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

toastErrorMessage(BuildContext context,String message){
  FToast ftoast = FToast();
  ftoast.init(context);
  Widget toast = Container(
    decoration:  BoxDecoration(
      borderRadius: BorderRadius.circular(10),
      color:Colors.green,
    ),
    child:Row(
      mainAxisSize: MainAxisSize.max,
      children: [
        const Icon(Icons.check, color:Colors.red),
        const SizedBox(width: 12),
        Expanded(
          child:Text(message),
        ),
      ],
    ),
  );
  ftoast.showToast(
    child: toast,
    toastDuration: const Duration(seconds: 3),
    gravity: ToastGravity.SNACKBAR,
  );
}