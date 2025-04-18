import 'package:freezed_annotation/freezed_annotation.dart';

part "panel_right_state.freezed.dart";

@freezed
class PanelRightState with _$PanelRightState {
  const PanelRightState._();
  const factory PanelRightState({@Default(true) bool open}) = _PanelRightState;

  PanelRightState withToggle() => copyWith(open: !open);
  static PanelRightState initialState() => PanelRightState(open: true);
}
