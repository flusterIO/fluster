import 'package:fluster/state/store.dart';
import 'package:fluster/state/ui/panels/actions/ui_actions.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_item.dart';
import 'package:flutter/material.dart';

// FIX: Fix this. Turn this into a function or a named constructor that takes returned note summaries as a parameter and nests them accordingly.
CommandPaletteItem getCommandPaletteRootOption() {
  return CommandPaletteItem(
    title: "Fluster",
    category: CommandPaletteCategory.root,
    items: [
      CommandPaletteItem(
        title: "Toggle Dark Mode",
        category: CommandPaletteCategory.action,
        onSelect: (BuildContext context) {
          final themeMode =
              Theme.brightnessOf(context) == Brightness.dark
                  ? ThemeMode.light
                  : ThemeMode.dark;
          globalReduxStore.dispatch(SetThemeModeAction(themeMode));
        },
      ),
    ],
  );
}
