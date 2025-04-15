import 'package:freezed_annotation/freezed_annotation.dart';

part "command_palette_state.dart.freezed.dart";

@freezed
class CommandPaletteState with _$CommandPaletteState {
  const factory CommandPaletteState({
    required bool open,
    required String query,
  }) = _CommandPaletteState;
}
