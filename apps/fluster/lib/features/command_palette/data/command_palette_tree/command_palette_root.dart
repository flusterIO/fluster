import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/navigation_commands/navigation_command_palette_category.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/theme_commands/themes_command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/material.dart';

class CommandPaletteRoot extends CommandPaletteCategory {
  CommandPaletteRoot()
    : super(
        label: "Home",
        desc: null,
        category: CommandPaletteCategoryId.root,
        items: <CommandPaletteEntry>[
                NavigationCommandPaletteCategory(),
                ThemesNavigationCommandPaletteCategory()
            ],
      );

  @override
  IconData getIcon() {
    return FluentIcons.home_48_filled;
  }

  @override
  CommandPaletteEntry getItem(int idx) {
    return items[idx];
  }

  @override
  int length() {
    return items.length;
  }
}
