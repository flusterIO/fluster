import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/action_commands/command_palette_action_commands.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/navigation_commands/navigation_command_palette_category.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/search_commands/search_command_category.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/theme_commands/themes_command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/material.dart';

class CommandPaletteRoot extends CommandPaletteCategory {
  final items = <CommandPaletteEntry>[
    NavigationCommandPaletteCategory(),
    ThemesNavigationCommandPaletteCategory(),
    CommandPaletteActionCommands(),
    SearchCommandPaletteCategory(),
  ];
  CommandPaletteRoot()
    : super(label: "Home", desc: null, category: CommandPaletteCategoryId.root);

  @override
  IconData getIcon() {
    return FluentIcons.home_48_filled;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnEnter() async {
    return items;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnQueryChange(String query) async {
    return items;
  }
}
