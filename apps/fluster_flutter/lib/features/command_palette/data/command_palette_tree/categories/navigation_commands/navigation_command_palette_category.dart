import 'package:fluster/features/command_palette/data/command_palette_tree/categories/navigation_commands/go_route_command_palette_option.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class NavigationCommandPaletteCategory extends CommandPaletteCategory {
  final items = <CommandPaletteEntry>[
    GoRouteCommandPaletteOption(
      label: "Home",
      desc: "",
      url: HomeScreenRoute().location.toString(),
      category: CommandPaletteCategoryId.navigation,
    ),
    GoRouteCommandPaletteOption(
      label: "Bookmarks",
      desc: "",
      url: BookmarksRoute().location.toString(),
      category: CommandPaletteCategoryId.navigation,
    ),
    GoRouteCommandPaletteOption(
      label: "Dashboard",
      desc: "",
      url: DashboardRoute().location.toString(),
      category: CommandPaletteCategoryId.navigation,
    ),
    GoRouteCommandPaletteOption(
      label: "Bibliography",
      desc: "",
      url: BibliographyRoute().location.toString(),
      category: CommandPaletteCategoryId.navigation,
    ),
    GoRouteCommandPaletteOption(
      label: "Manage connections",
      desc: "",
      url: ConnectRoute().location.toString(),
      category: CommandPaletteCategoryId.navigation,
    ),
    GoRouteCommandPaletteOption(
      label: "Settings",
      desc: "",
      url: SettingsRoute().location.toString(),
      category: CommandPaletteCategoryId.navigation,
    ),
  ];
  NavigationCommandPaletteCategory()
    : super(
        label: "Navigation",
        desc: "Quick Navigation Links",
        category: CommandPaletteCategoryId.navigation,
      );

  @override
  getItemsOnEnter() async {
    return items;
  }

  @override
  IconData getIcon() {
    return FontAwesomeIcons.road;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnQueryChange(String query) async {
    return items;
  }
}
