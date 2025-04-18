
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';
import 'package:flutter/material.dart';

class SetThemeModeAction extends FlusterAction {
  final ThemeMode themeMode;
  SetThemeModeAction(this.themeMode);

  @override
  GlobalAppState reduce() {
    return state.copyWith(uiState: state.uiState.withThemeMode(themeMode));
  }
}
