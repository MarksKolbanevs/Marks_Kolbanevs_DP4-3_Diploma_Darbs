import 'package:flutter/material.dart';

class SocialButton extends StatelessWidget {
  final IconData icon;
  final Color color;
  final VoidCallback onPressed;

  SocialButton({required this.icon,required this.color,required this.onPressed });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50.0,
      height: 50.0,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(width: 1.0, color: color),
      ),
      child: IconButton(
        icon: Icon(icon, color: color),
        color: color,
        onPressed: onPressed,
      ),
    );
  }
}
