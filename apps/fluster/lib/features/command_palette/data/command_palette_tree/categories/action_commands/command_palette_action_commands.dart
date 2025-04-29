import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/action_commands/command_palete_global_action_command.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/action_commands/toggle_dark_mode_command.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CommandPaletteActionCommands extends CommandPaletteCategory {
  CommandPaletteActionCommands()
    : super(
        label: "Actions",
        desc:
            "Quickly run functions, synchronize your database and interact with your data.",
        category: CommandPaletteCategoryId.globalActions,
        items: <CommandPaletteEntry>[
          CommandPaletteGlobalActionCommand(
            label: "Sync Database",
            desc:
                "Populate your database with the content of your notes from your local file system.",
            category: CommandPaletteCategoryId.globalActions,
            items: [],
            actionId: GlobalActionId.syncDirectoryWithDatabase,
          ),
          ToggleDarkModeCommand(),
        ],
      );

  @override
  IconData getIcon() {
    return FontAwesomeIcons.gamepad;
  }

  // TODO: Remove this getItem and and length field from all of these child classes. That approach was abandonded a while ago.
  @override
  CommandPaletteEntry getItem(int idx) {
    return items[idx];
  }

  @override
  int length() {
    return items.length;
  }
}
