import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/core/static/settings/initial_keymap/keymap_categories/general_keymap.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_category.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_category_enum.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_entry.dart';
import 'package:flutter/widgets.dart';

class InitialCommandPaletteCategory extends CommandPaletteCategory {
  static const List<CommandPaletteEntry> items = [CommandPaletteActions()];
  const InitialCommandPaletteCategory()
    : super(label: "", category: CommandPaletteCategoryId.root);

  @override
  IconData getIcon() {
    return FluentIcons.run_48_filled;
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
