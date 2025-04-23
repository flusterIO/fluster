import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';

abstract class CommandPaletteItem extends CommandPaletteEntry {
  final GlobalAction action;
  const CommandPaletteItem({
    required super.label,
    required super.category,
    required super.items,
    required super.desc,
    required this.action,
  });
}
