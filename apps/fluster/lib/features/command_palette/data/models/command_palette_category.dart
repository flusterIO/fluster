import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/material.dart';

abstract class CommandPaletteCategory extends CommandPaletteEntry {
  const CommandPaletteCategory({required super.label, required super.category, required super.desc, required super.items});

  int length();

  CommandPaletteEntry getItem(int idx);

  IconData getIcon();
}
