import 'package:async_redux/async_redux.dart';
import 'package:fluster/app.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/state/nested_state/ui_state/actions/ui_actions.dart';

class DevelopmentStateLogger extends ActionObserver<GlobalAppState> {
  DevelopmentStateLogger();

  @override
  void observe(ReduxAction action, int dispatchCount, {required bool ini}) {
    // ignore: avoid_print
    print("$action");
  }
}

class ThemeStateObserver extends ActionObserver<GlobalAppState> {
  ThemeStateObserver();

  @override
  void observe(ReduxAction action, int dispatchCount, {required bool ini}) {
    if (action is SetColorSchemeAction) {
      globalColorScheme.value = (action as SetColorSchemeAction).scheme;
    }

    if (action is SetThemeModeAction) {
      globalThemeMode.value = (action as SetThemeModeAction).themeMode;
    }
  }
}
