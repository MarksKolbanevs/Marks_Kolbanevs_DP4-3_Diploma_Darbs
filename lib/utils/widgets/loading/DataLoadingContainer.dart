import 'package:flutter/material.dart';

class DataLoadingContainer extends StatelessWidget {
  final double width;
  final double height;

  DataLoadingContainer({required this.width,required this.height});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      color: Colors.red,
    );
  }
}
