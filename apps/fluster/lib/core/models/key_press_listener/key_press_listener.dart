import 'package:flutter/material.dart';

enum FlusterKeyPressResult {
  actionTakenCanIgnoreRest,
  unaffectedContinueAsNormal,
}

// TODO: Remove this. It's no longer being used but might be referenced elsewhere.
class FlusterKeyPressListener {
  FlusterKeyPressListener({required this.listener});
  final FlusterKeyPressResult Function(FocusNode, KeyEvent) listener;
}
