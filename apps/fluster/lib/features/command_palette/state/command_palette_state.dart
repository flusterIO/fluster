import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "command_palette_state.freezed.dart";

enum CommandPaletteView { List, SideBySideMdx }

@freezed
class CommandPaletteState with _$CommandPaletteState {
  const CommandPaletteState._();
  const factory CommandPaletteState({
    @Default(true) bool open,
    @Default("") String query,
    @Default([]) List<CommandPaletteItem> items,
    @Default([]) List<String> navigationStack,
  }) = _CommandPaletteState;
  static CommandPaletteState initialState() => CommandPaletteState(open: false);
}
