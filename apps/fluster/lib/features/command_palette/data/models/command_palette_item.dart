import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';

abstract class CommandPaletteItem extends CommandPaletteEntry {
  final void Function() action;
  const CommandPaletteItem({
    required super.label,
    required super.category,
    required super.items,
    required super.desc,
    required this.action,
  });
  @override
    void enter() {
        action();
    }
}
