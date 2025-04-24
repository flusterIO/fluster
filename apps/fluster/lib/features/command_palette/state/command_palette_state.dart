import 'dart:math';

import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "command_palette_state.freezed.dart";

enum CommandPaletteView { list, sideBySideMdx }

@freezed
class CommandPaletteState with _$CommandPaletteState {
  const CommandPaletteState._();
  const factory CommandPaletteState({
    @Default(true) bool open,
    @Default("") String query,
    @Default([]) List<CommandPaletteItem> items,
    @Default([]) List<CommandPaletteEntry> navigationStack,
    @Default(0) int selectedIndex,
  }) = _CommandPaletteState;
  static CommandPaletteState initialState() => CommandPaletteState(open: false);
  
  CommandPaletteState withAddedSelectedIndex(int addToIndex) => CommandPaletteState( 
        selectedIndex: max(selectedIndex + addToIndex % items.length - 1, 0)
    );
}
