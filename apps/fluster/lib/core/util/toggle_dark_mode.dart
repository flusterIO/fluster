import 'package:async_redux/async_redux.dart';
import 'package:fluster/core/state/nested_state/ui_state/actions/ui_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/core/static/global_keys.dart';
import 'package:flutter/material.dart';

void toggleDarkMode(ThemeMode? providedThemeMode, BuildContext? context) {
    
  final themeMode =
      providedThemeMode ??
      Theme.of(context ?? desktopScaffoldMessenegerKey.currentState!.context)).brightness;
  if (context != null) {
    context.dispatch(
      SetThemeModeAction(
        (themeMode == Brightness.dark) ? ThemeMode.light : ThemeMode.dark,
      ),
    );
  } else {
    globalReduxStore.dispatch(
      SetThemeModeAction(
        (themeMode == Brightness.dark) ? ThemeMode.light : ThemeMode.dark,
      ),
    );
  }
}
