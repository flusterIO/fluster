import 'package:flutter/material.dart';


class FlusterError implements Exception {
    String cause;
    StackTrace? trace;
    FlusterError({required this.cause, this.trace});
}

class DesktopErrorPage extends StatelessWidget {
  final FlusterError error;
  const DesktopErrorPage({super.key, required this.error});
  @override
  Widget build(BuildContext context) {
    return Text(error.cause);
  }
}
