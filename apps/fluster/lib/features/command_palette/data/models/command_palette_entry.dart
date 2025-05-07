import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:flutter/material.dart';

abstract class CommandPaletteEntry {
  final String label;
  final String? desc;
  final CommandPaletteCategoryId category;
  const CommandPaletteEntry({
    required this.label,
    required this.category,
    required this.desc,
  });
  void callAction(BuildContext context);
}
