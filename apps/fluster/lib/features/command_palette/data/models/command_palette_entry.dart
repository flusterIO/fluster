import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';

abstract class CommandPaletteEntry {
  final String label;
  final String? desc;
  final CommandPaletteCategoryId category;
  final List<CommandPaletteEntry> items;
  const CommandPaletteEntry({
    required this.label,
    required this.category,
    required this.items,
    required this.desc,
  });
}
