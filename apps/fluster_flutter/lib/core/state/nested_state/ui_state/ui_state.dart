import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:fluster/app.dart';
import 'package:fluster/features/panel_left/state/panel_left_state.dart';
import 'package:fluster/features/panel_right/state/panel_right_state.dart';
import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "ui_state.freezed.dart";

@freezed
class GlobalUIState with _$GlobalUIState {
  const GlobalUIState._();
  const factory GlobalUIState({
    required PanelLeftState panelLeftState,
    required PanelRightState panelRightState,
    required ThemeMode themeMode,
    @Default(FlexScheme.shadBlue) FlexScheme colorScheme,
  }) = _GlobalUIState;
  static GlobalUIState initialState() => GlobalUIState(
    panelLeftState: PanelLeftState.initialState(),
    panelRightState: PanelRightState.initialState(),
    themeMode: ThemeMode.system,
  );

  GlobalUIState withThemeMode(ThemeMode themeMode) =>
      copyWith(themeMode: themeMode);
}
