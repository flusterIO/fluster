import 'package:fluster_ui/widgets/command_palette/models/command_palette_category_enum.dart';

abstract class CommandPaletteEntry {
  final String label;
  final String? desc;
  final CommandPaletteCategoryId category;
  const CommandPaletteEntry({required this.label, required this.category, this.desc});
}
