import 'package:flutter/material.dart';

class RoomPageUserMessageAlign extends StatelessWidget {
  final String message;

  RoomPageUserMessageAlign({required this.message});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Align(
      alignment: Alignment.bottomRight,
      child:Container(
        width: screenWidth / 2,
        color: Theme.of(context).colorScheme.secondary, // Set the background color here
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text(message, style: Theme.of(context).textTheme.displaySmall?.copyWith(color:Colors.white)),
        ),
      ),
    );
  }
}
