import 'package:async_redux/async_redux.dart';
import 'package:fluster/app.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/state/nested_state/ui_state/actions/ui_actions.dart';
import 'package:pretty_json/pretty_json.dart';

class DevelopmentStateLogger extends ActionObserver<GlobalAppState> {
  DevelopmentStateLogger();

  @override
  void observe(ReduxAction action, int dispatchCount, {required bool ini}) {
    // ignore: avoid_print
    print("----------------------");
    // ignore: avoid_print
    print("$action");
    // ignore: avoid_print
    print(prettyJson(action.state, indent: 2));
  }
}

class ThemeStateObserver extends ActionObserver<GlobalAppState> {
  ThemeStateObserver();

  @override
  void observe(ReduxAction action, int dispatchCount, {required bool ini}) {
    if (action is SetColorSchemeAction) {
      globalColorScheme.value = (action).scheme;
    }

    if (action is SetThemeModeAction) {
      globalThemeMode.value = (action).themeMode;
    }
  }
}
