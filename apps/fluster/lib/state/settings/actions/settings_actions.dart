import 'dart:async';

import 'package:async_redux/async_redux.dart';
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/static/settings/settings_root.dart';

class SetInitialSettingStateAction extends ReduxAction<GlobalAppState> {
  final Settings settings;

  SetInitialSettingStateAction(this.settings);

  @override
  FutureOr<GlobalAppState?> reduce() {
    return state.copyWith(
      settingsState: state.settingsState.copyWith(settings: settings, isLoading: false),
    );
  }

}
