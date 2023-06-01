import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:monle/styles/colors.dart';

class RedirectText extends StatelessWidget {
  final String title;
  final String text;
  final String route;

  RedirectText({required this.route,required this.text,required this.title});

  @override
  Widget build(BuildContext context) {
    return Row(
        children:<Widget>[
          Text(
            title,
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(width:5),
          GestureDetector(
              onTap: () {Navigator.pushNamed(context, route);},
              child:Text(text, style: const TextStyle(fontSize:12.0,fontWeight: FontWeight.bold, color: Color(blueColor)))
          ),
        ]
    );
  }
}