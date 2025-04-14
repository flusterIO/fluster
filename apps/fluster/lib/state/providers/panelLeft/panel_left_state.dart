import 'package:freezed_annotation/freezed_annotation.dart';

part "panel_left_state.freezed.dart";

@freezed
class PanelLeftState with _$PanelLeftState {
  const factory PanelLeftState({required bool open}) = _PanelLeftState;
}
