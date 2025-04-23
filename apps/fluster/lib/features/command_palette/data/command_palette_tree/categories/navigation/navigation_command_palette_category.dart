import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/src/widgets/icon_data.dart';

class NavigationCommandPaletteCategory extends CommandPaletteCategory {
  const NavigationCommandPaletteCategory()
    : super(
        label: "Navigation",
        desc: "Quick Navigation Links",
        category: CommandPaletteCategoryId.navigation,
        items: const <CommandPaletteEntry>[],
      );

  @override
  IconData getIcon() {
        return FluentIcons.directions_48_filled;
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
