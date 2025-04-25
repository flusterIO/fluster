import 'dart:async';

import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';

class SetCommandPaletteFilteredItems extends FlusterAction {
  final List<CommandPaletteEntry> items;
  SetCommandPaletteFilteredItems(this.items);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        filteredItems: items,
      ),
    );
  }
}
