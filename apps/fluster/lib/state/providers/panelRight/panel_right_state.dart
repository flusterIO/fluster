import 'package:freezed_annotation/freezed_annotation.dart';

part "panel_right_state.freezed.dart";

@freezed
class PanelRightState with _$PanelRightState {
    const factory PanelRightState({
        required bool open
    }) = _PanelRightState;
}
