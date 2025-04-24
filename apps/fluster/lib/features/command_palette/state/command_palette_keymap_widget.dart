import 'package:flutter/material.dart';

class CommandPaletteKeymapWidget extends StatelessWidget {
  final Widget child;
  const CommandPaletteKeymapWidget({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    return CallbackShortcuts(
      bindings: {
        // context.state.settingsState.settings.pages[SettingPageId.keymap].sections.
      },
      child: Placeholder(),
    );
  }
}
