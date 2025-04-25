import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/core/state/nested_state/ui_state/actions/ui_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';
import 'package:fluster/features/settings/data/enums/formatted_flex_scheme_name.dart';
import 'package:flutter/widgets.dart';

class ThemeCommandPaletteEntry extends CommandPaletteItem {
  const ThemeCommandPaletteEntry({
    required super.label,
    required super.action,
    required super.category,
    required super.items,
    required super.desc,
  });
}

class ThemesNavigationCommandPaletteCategory extends CommandPaletteCategory {
  ThemesNavigationCommandPaletteCategory()
    : super(
        label: "Themes",
        desc: "Quickly toggle themes throughout the application",
        category: CommandPaletteCategoryId.themes,
        items: FlexScheme.values.map((s) {
          return ThemeCommandPaletteEntry(
            label: getFlexColorSchemeFormattedName(s),
            desc: "",
            items: [],
            category: CommandPaletteCategoryId.themes,
            action: () {
              globalReduxStore.dispatchAll([
                SetColorSchemeAction(s),
              ]);
            },
          );
        }).toList(),
      );

  @override
  IconData getIcon() {
    return FluentIcons.paint_brush_32_filled;
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
