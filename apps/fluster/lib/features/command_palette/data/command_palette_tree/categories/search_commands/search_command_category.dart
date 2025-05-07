import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_note_entry.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart' as native;

class SearchCommandPaletteCategory extends CommandPaletteCategory {
  SearchCommandPaletteCategory()
    : super(
        label: "Search",
        desc: "Quickly search through all of your notes and related content.",
        category: CommandPaletteCategoryId.search,
      );

  @override
  IconData getIcon() {
    return FontAwesomeIcons.binoculars;
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnEnter() async {
    final repo = await native.MdxNotesRepository.default_();
   final notes = await repo.search(query: native.MdxNoteQueryParams(query: "", language: native.DbTokenizerLanguage.english)); 
    return notes.map((x) => CommandPaletteNoteEntry.fromNoteEntity(x)).toList();
  }

  @override
  Future<List<CommandPaletteEntry>> getItemsOnQueryChange(String query) async {
    return <CommandPaletteEntry>[];
  }
}
