import 'dart:math';

import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "command_palette_state.freezed.dart";

enum CommandPaletteView { list, sideBySideMdx }

@freezed
class CommandPaletteState with _$CommandPaletteState {
  const CommandPaletteState._();
  const factory CommandPaletteState({
    @Default(true) bool open,
    @Default([]) List<CommandPaletteEntry> filteredItems,
    @Default([]) List<CommandPaletteCategory> navigationStack,
    @Default(0) int selectedIndex,
    @Default(CommandPaletteView.list) CommandPaletteView view,
  }) = _CommandPaletteState;
  static CommandPaletteState initialState() => CommandPaletteState(open: false);

  CommandPaletteState withAddedSelectedIndex(int addToIndex) {
    if (filteredItems.isEmpty) {
      return copyWith();
    }
    return copyWith(
      selectedIndex: max(
        (selectedIndex + addToIndex) % filteredItems.length,
        0,
      ),
    );
  }

  CommandPaletteState reset() {
    return CommandPaletteState(
      open: false,
      filteredItems: [],
      selectedIndex: 0,
      navigationStack: [],
    );
  }
}
