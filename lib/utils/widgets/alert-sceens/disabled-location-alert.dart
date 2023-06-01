// Define a function to show the alert dialog
import 'package:flutter/material.dart';

void disabledLocationAlert(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text('Alert'),
        content: Column(
          children: const [
            Icon(
              Icons.location_disabled_outlined,
              size: 150,
              weight: 5,
            ),
            Text('Please turn on the location')
          ],
        ),
        actions: const <Widget>[],
      );
    },
  );
}
