import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/categories/navigation_commands/go_route_command_palette_option.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:flutter/widgets.dart';

class NavigationCommandPaletteCategory extends CommandPaletteCategory {
  NavigationCommandPaletteCategory()
    : super(
        label: "Navigation",
        desc: "Quick Navigation Links",
        category: CommandPaletteCategoryId.navigation,
        items: <CommandPaletteEntry>[
          GoRouteCommandPaletteOption(
            label: "Home",
            desc: "",
           routeName: RouteNames.home, 
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
          GoRouteCommandPaletteOption(
            label: "Bookmarks",
            desc: "",
           routeName: RouteNames.bookmarks, 
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
          GoRouteCommandPaletteOption(
            label: "Dashboard",
            desc: "",
           routeName: RouteNames.dashboard, 
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
          GoRouteCommandPaletteOption(
            label: "Bibliography",
            desc: "",
           routeName: RouteNames.bibliography, 
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
          GoRouteCommandPaletteOption(
            label: "Manage connections",
            desc: "",
           routeName: RouteNames.connect, 
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
          GoRouteCommandPaletteOption(
            label: "Settings",
            desc: "",
           routeName: RouteNames.settings, 
            items: [],
            category: CommandPaletteCategoryId.navigation,
          ),
        ],
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
