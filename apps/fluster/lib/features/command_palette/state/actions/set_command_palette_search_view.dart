import 'dart:async';

import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_note_entry.dart';
import 'package:fluster/features/command_palette/state/command_palette_state.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;

class CommandPaletteNoteItem {}

class SetCommandPaletteTextSearch extends FlusterAction {
  @override
  Future<GlobalAppState> reduce() async {
    final repo = await native.MdxNotesRepository.default_();
    final notes = await repo.search(
      query: native.MdxNoteQueryParams(
        query: "",
        language: native.DbTokenizerLanguage.english,
      ),
      // query: native.MdxNoteQueryParams(
      //   query: "",
      //   language: native.DbTokenizerLanguage.english,
      // ),
    );
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        open: true,
        view: CommandPaletteView.sideBySideMdx,
        filteredItems: notes
            .map((x) => CommandPaletteNoteEntry.fromNoteEntity(x))
            .toList(),
      ),
    );
  }
}
