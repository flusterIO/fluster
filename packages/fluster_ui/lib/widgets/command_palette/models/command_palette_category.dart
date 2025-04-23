import 'package:fluster_ui/widgets/command_palette/models/command_palette_entry.dart';
import 'package:flutter/material.dart';

abstract class CommandPaletteCategory extends CommandPaletteEntry {
  const CommandPaletteCategory({
    required super.label,
    required super.category,
  });


  int length();

  CommandPaletteEntry getItem(int idx);

  IconData getIcon();
}
