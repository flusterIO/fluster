import 'package:fluster/features/command_palette/data/command_palette_tree/categories/navigation_commands/go_route_command_palette_option.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SearchCommandPaletteCategory extends CommandPaletteCategory {
  SearchCommandPaletteCategory()
    : super(
        label: "Search",
        desc: "Quickly search through all of your notes and related content.",
        category: CommandPaletteCategoryId.search,
      );

  @override
  IconData getIcon() {
    return FontAwesomeIcons.binoculars;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnEnter() async {
    return <CommandPaletteEntry>[
      GoRouteCommandPaletteOption(
        label: "Home",
        desc: "",
        url: HomeScreenRoute().location.toString(),
        category: CommandPaletteCategoryId.navigation,
      ),
    ];
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnQueryChange(String query) async {
    return <CommandPaletteEntry>[];
  }
}
