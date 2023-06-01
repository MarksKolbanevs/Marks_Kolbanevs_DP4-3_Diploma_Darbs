import 'package:flutter/material.dart';

class SettingsAccountSectionTextField extends StatelessWidget {
  final String hintText;
  final TextEditingController controller;
  var onSaved;
  SettingsAccountSectionTextField({required this.hintText,required this.controller, required this.onSaved});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:EdgeInsets.only(top:10,bottom:10),
      child:TextFormField(
        onSaved: onSaved,
        controller: controller,
        decoration: InputDecoration(
          filled: true,
          fillColor: Theme.of(context).colorScheme.onTertiary,
          hintText: hintText,
          hintStyle: Theme.of(context).textTheme.displaySmall,
          contentPadding: EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(7.0),
            borderSide: BorderSide.none,
          ),
        ),
      ),
    );
  }
}
