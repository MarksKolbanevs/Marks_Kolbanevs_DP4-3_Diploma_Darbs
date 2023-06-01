import 'package:flutter/material.dart';

class RoomPageHelperMessageAlign extends StatelessWidget {
  final String message;

  RoomPageHelperMessageAlign({required this.message});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Align(
      alignment: Alignment.bottomLeft,
      child:Container(
        width: screenWidth / 2,
        color: Colors.white, // Set the background color here
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(message, style: Theme.of(context).textTheme.displaySmall),
        ),
      ),
    );
  }
}
