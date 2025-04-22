import 'package:flutter/material.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';

class DesktopKeyboardShortcuts extends StatelessWidget {
  final Widget child;
  const DesktopKeyboardShortcuts({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    return CallbackShortcuts(
      bindings: context.state.settingsState.settings.toCallbackShortcuts(),
      child: child,
    );
  }
}

