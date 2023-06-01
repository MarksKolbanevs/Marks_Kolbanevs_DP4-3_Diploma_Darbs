import 'package:flutter/material.dart';

class PrimaryRoundedProceedButton extends StatelessWidget {
  final VoidCallback onPressed;

  PrimaryRoundedProceedButton({required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed:onPressed,
      style: ElevatedButton.styleFrom(
        shape: CircleBorder(),
        padding: EdgeInsets.all(0),
        primary: Theme.of(context).colorScheme.secondary,
      ),
      child: Container(
        width: 50,
        height: 50,
        child: Icon(
          Icons.arrow_forward_ios,
          color: Colors.white,
        ),
      ),
    );
  }
}
