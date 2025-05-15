import 'package:freezed_annotation/freezed_annotation.dart';

part "panel_left_state.freezed.dart";

@freezed
class PanelLeftState with _$PanelLeftState {
    const PanelLeftState._();
    const factory PanelLeftState({
        @Default(true) bool open,
    }) = _PanelLeftState;
    PanelLeftState withToggle() => copyWith(open: !open);
    static PanelLeftState initialState() => PanelLeftState(open: true);
}
