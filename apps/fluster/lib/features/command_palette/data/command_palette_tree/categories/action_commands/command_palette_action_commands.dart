import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/action_commands/command_palete_global_action_command.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/action_commands/toggle_dark_mode_command.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CommandPaletteActionCommands extends CommandPaletteCategory {
  final items = <CommandPaletteEntry>[
    CommandPaletteGlobalActionCommand(
      label: "Sync Database",
      desc:
          "Populate your database with the content of your notes from your local file system.",
      category: CommandPaletteCategoryId.globalActions,
      actionId: GlobalActionId.syncDirectoryWithDatabase,
    ),
    ToggleDarkModeCommand(),
  ];
  CommandPaletteActionCommands()
    : super(
        label: "Actions",
        desc:
            "Quickly run functions, synchronize your database and interact with your data.",
        category: CommandPaletteCategoryId.globalActions,
      );

  @override
  IconData getIcon() {
    return FontAwesomeIcons.gamepad;
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
