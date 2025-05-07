import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart';

class CommandPaletteNoteEntry extends CommandPaletteItem {
  final String noteId;
  final String title;
  CommandPaletteNoteEntry({required this.noteId, required this.title})
    : super(
        desc: "",
        label: title,
        items: [],
        category: CommandPaletteCategoryId.noteTextSearch,
        action: (_) {
          print("Here");
        },
      );

  static CommandPaletteNoteEntry fromNoteEntity(MdxNoteEntity entity) {
    return CommandPaletteNoteEntry(
      noteId: entity.id.toString(),
      title: entity.frontMatter.title,
    );
  }
}
