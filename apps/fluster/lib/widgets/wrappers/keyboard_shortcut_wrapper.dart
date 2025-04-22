import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/static/settings/settings_root.dart';
import 'package:flutter/material.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';

class DesktopKeyboardShortcuts extends StatelessWidget {
  final Widget child;
  const DesktopKeyboardShortcuts({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    final keymapSettings = context.state.settingsState.settings.pages[SettingPageId.keymap] as KeymapSettingPageData;
    return CallbackShortcuts(
      bindings: keymapSettings.toCallbackShortcuts(),
      child: child,
    );
  }
}

