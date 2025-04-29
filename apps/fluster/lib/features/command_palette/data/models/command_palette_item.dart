import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/material.dart';

abstract class CommandPaletteItem extends CommandPaletteEntry {
  final void Function(BuildContext context) action;
  const CommandPaletteItem({
    required super.label,
    required super.category,
    required super.items,
    required super.desc,
    required this.action,
  });


  @override
    void callAction(context) {
        action(context);
    }
}
