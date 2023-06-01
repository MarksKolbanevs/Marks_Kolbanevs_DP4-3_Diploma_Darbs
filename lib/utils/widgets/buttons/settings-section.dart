import 'package:flutter/material.dart';

class SettingsSectionButton extends StatelessWidget {
  final IconData icon;
  final String sectionName;
  final VoidCallback onPressed;
  SettingsSectionButton({required this.icon,required this.sectionName,required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed:onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(icon),
              SizedBox(width: 15),
              Text(sectionName,style:Theme.of(context).textTheme.headlineMedium)
            ],
          ),
          Icon(Icons.keyboard_arrow_right_rounded)
        ],
      ),
    );
  }
}
