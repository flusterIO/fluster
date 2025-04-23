import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_category.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_category_enum.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_entry.dart';
import 'package:flutter/widgets.dart';

class CommandPaletteActions extends CommandPaletteCategory {
  static const List<CommandPaletteEntry> items = [];

  const CommandPaletteActions()
    : super(category: CommandPaletteCategoryId.globalActions, label: "Actions");

  @override
  IconData getIcon() {
    return FluentIcons.arrow_up_right_48_filled;
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
