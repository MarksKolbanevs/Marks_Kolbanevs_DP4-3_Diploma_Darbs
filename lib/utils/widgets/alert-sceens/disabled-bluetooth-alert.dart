// Define a function to show the alert dialog
import 'package:flutter/material.dart';

void disabledBluetoothAlert(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text('Bluetooth is off'),
        content: Column(
          children: const [
            Icon(
              Icons.bluetooth_disabled_rounded,
              size: 150,
              weight: 5,
            ),
            Text('Please turn on the bluetooth')
          ],
        ),
        actions: const <Widget>[],
      );
    },
  );
}
