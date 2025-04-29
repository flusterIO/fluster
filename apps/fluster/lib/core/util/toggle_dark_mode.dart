import 'package:fluster/core/state/nested_state/ui_state/actions/ui_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/core/static/global_keys.dart';
import 'package:flutter/material.dart';

void toggleDarkMode(ThemeMode? providedThemeMode) { 
    final themeMode = providedThemeMode ?? Theme.brightnessOf(desktopScaffoldMessenegerKey.currentState!.context);
    globalReduxStore.dispatch(SetThemeModeAction((themeMode == Brightness.dark) ? ThemeMode.light : ThemeMode.dark));
}
