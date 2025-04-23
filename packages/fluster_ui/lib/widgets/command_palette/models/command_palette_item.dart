import 'package:fluster_ui/widgets/command_palette/models/command_palette_entry.dart';

abstract class CommandPaletteItem extends CommandPaletteEntry {
  const CommandPaletteItem({required super.label, required super.category});
}

