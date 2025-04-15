import 'package:fluster/state/providers/theme/theme_provider.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// FIX: Fix this. Turn this into a function or a named constructor that takes returned note summaries as a parameter and nests them accordingly.
CommandPaletteItem getCommandPaletteRootOption() {
  return CommandPaletteItem(
    title: "Fluster",
    category: CommandPaletteCategory.root,
    items: [
      CommandPaletteItem(
        title: "Toggle Dark Mode",
        category: CommandPaletteCategory.action,
        onSelect: (BuildContext context, WidgetRef ref) {
          final theme = ref.read(themeProvider.notifier);
          theme.state =
              Theme.brightnessOf(context) == Brightness.dark
                  ? ThemeMode.light
                  : ThemeMode.dark;
        },
      ),
    ],
  );
}
