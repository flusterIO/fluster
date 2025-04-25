import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:flutter/material.dart';

class SetThemeModeAction extends FlusterAction {
  final ThemeMode themeMode;
  SetThemeModeAction(this.themeMode);

  @override
  GlobalAppState reduce() {
    return state.copyWith(uiState: state.uiState.withThemeMode(themeMode));
  }
}

class SetColorSchemeAction extends FlusterAction {
  final FlexScheme scheme;
  SetColorSchemeAction(this.scheme);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      uiState: state.uiState.copyWith(colorScheme: scheme),
      // commandPaletteState: state.commandPaletteState.reset(),
    );
  }
}
