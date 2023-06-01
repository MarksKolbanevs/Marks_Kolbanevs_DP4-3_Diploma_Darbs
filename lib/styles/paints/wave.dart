import 'package:flutter/material.dart';
import 'dart:math';

class WavePainter extends CustomPainter {
  final Animation<double> animation;
  final double amplitude;
  final double frequency;

  WavePainter(this.animation, {this.amplitude = 20, this.frequency = 1})
      : super(repaint: animation);

  @override
  void paint(Canvas canvas, Size size) {

    final paint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          Colors.blue,
          Colors.green,
        ],
      ).createShader(Rect.fromPoints(
        Offset(0, 0),
        Offset(size.width, size.height),
      ))
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    final path = Path();

    for (double x = 0; x <= size.width * 2; x++) {
      final y = sin((x / size.width * frequency * pi * 2) +
          (animation.value * 2 * pi)) *
          amplitude;
      if (x == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }

    canvas.rotate(45); // rotate the canvas by 45 degrees
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(WavePainter oldDelegate) =>
      animation != oldDelegate.animation;
}
