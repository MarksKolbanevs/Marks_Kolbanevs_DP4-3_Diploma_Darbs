import 'package:flutter/material.dart';

class ShadowedContainer extends StatelessWidget {
  final Widget child;
  final padding;
  ShadowedContainer({required this.child,required this.padding});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.tertiary,
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Color(0xFFFFFFFF).withOpacity(0.15),
            offset: Offset(-1.0, -1.0),
            blurRadius: 2.0,
          ),
          BoxShadow(
            color: Color.fromRGBO(0, 0, 0, 0.25),
            offset: Offset(1.0, 1.0),
            blurRadius: 4.0,
          ),
        ],
      ),
      padding: padding,
      child: child
    );
  }
}
