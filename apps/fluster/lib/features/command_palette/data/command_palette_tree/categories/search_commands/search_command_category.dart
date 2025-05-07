import 'package:fluster/features/command_palette/data/command_palette_tree/categories/navigation_commands/go_route_command_palette_option.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class NavigationCommandPaletteCategory extends CommandPaletteCategory {
  NavigationCommandPaletteCategory()
    : super(
        label: "Search",
        desc: "Quickly search through all of your notes and related content.",
        category: CommandPaletteCategoryId.search,
        items: <CommandPaletteEntry>[
          GoRouteCommandPaletteOption(
            label: "Home",
            desc: "",
            url: HomeScreenRoute().location.toString(),
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
        ],
      );

  @override
  IconData getIcon() {
    return FontAwesomeIcons.road;
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
