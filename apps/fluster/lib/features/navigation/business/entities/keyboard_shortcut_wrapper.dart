import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:flutter/material.dart';

class DesktopKeyboardShortcuts extends StatelessWidget {
  final Widget child;
  const DesktopKeyboardShortcuts({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    final keymapSettings =
        context.state.settingsState.settings.pages[SettingPageId.keymap]
            as KeymapSettingPageData;
    return CallbackShortcuts(
      bindings: keymapSettings.toCallbackShortcuts(),
      child: child,
    );
  }
}
