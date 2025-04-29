import 'package:fluster/core/util/toggle_dark_mode.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';

class ToggleDarkModeCommand extends CommandPaletteItem {
  ToggleDarkModeCommand()
    : super(
        label: "Toggle Dark Mode",
        desc: "",
        items: [],
        action: (context) {
          toggleDarkMode(null, context);
        },
        category: CommandPaletteCategoryId.themes,
      );
}
