import 'package:fluster/core/state/nested_state/layout_state/panels/actions/ui_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';
import 'package:flutter/material.dart';

// FIX: Fix this. Turn this into a function or a named constructor that takes returned note summaries as a parameter and nests them accordingly.
CommandPaletteItem getCommandPaletteRootOption() {
  return CommandPaletteItem(
    title: "Fluster",
    category: CommandPaletteCategory.root,
    id: "root",
    items: [
      CommandPaletteItem(
        title: "Toggle Dark Mode",
        id: "darkmode",
        category: CommandPaletteCategory.action,
        onSelect: (BuildContext context) {
          final themeMode = Theme.brightnessOf(context) == Brightness.dark
              ? ThemeMode.light
              : ThemeMode.dark;
          globalReduxStore.dispatch(SetThemeModeAction(themeMode));
        },
      ),
    ],
  );
}
