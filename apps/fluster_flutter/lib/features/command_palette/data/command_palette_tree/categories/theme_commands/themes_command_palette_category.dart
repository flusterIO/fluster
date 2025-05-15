import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:fluster/core/state/nested_state/ui_state/actions/ui_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/settings/data/enums/formatted_flex_scheme_name.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class ThemeCommandPaletteEntry extends CommandPaletteItem {
  const ThemeCommandPaletteEntry({
    required super.label,
    required super.action,
    required super.category,
    required super.desc,
  });
}

class ThemesNavigationCommandPaletteCategory extends CommandPaletteCategory {
  var items = <CommandPaletteEntry>[];
  ThemesNavigationCommandPaletteCategory()
    : super(
        label: "Themes",
        desc: "Quickly toggle themes throughout the application",
        category: CommandPaletteCategoryId.themes,
      );

  @override
  IconData getIcon() {
    return FontAwesomeIcons.palette;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnEnter() async {
    final newItems = items.isNotEmpty
        ? items
        : FlexScheme.values.map((s) {
            return ThemeCommandPaletteEntry(
              label: getFlexColorSchemeFormattedName(s),
              desc: "",
              category: CommandPaletteCategoryId.themes,
              action: (_) {
                globalReduxStore.dispatchAll([SetColorSchemeAction(s)]);
                globalReduxStore.dispatch(
                  SetCommandPaletteOpenAction(false, initialCategory: null),
                );
              },
            );
          }).toList();
    items = newItems;
    return newItems;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnQueryChange(String query) async {
    final newItems = items.isNotEmpty
        ? items
        : FlexScheme.values.map((s) {
            return ThemeCommandPaletteEntry(
              label: getFlexColorSchemeFormattedName(s),
              desc: "",
              category: CommandPaletteCategoryId.themes,
              action: (_) {
                globalReduxStore.dispatchAll([SetColorSchemeAction(s)]);
                globalReduxStore.dispatch(
                  SetCommandPaletteOpenAction(false, initialCategory: null),
                );
              },
            );
          }).toList();
    items = newItems;
    return newItems;
  }
}
