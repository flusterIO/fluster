


import 'package:flutter/material.dart';

enum FlusterKeyPressResult {
  actionTakenCanIgnoreRest,
  unaffectedContinueAsNormal,
}

class FlusterKeyPressListener {
  FlusterKeyPressListener({required this.listener});
  final FlusterKeyPressResult Function(FocusNode, RawKeyEvent) listener;
}
