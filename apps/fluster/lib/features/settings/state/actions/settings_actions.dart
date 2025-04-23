import 'dart:async';

import 'package:async_redux/async_redux.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/state/nested_state/network_state/network_state.dart';
import 'package:fluster/features/settings/data/setting_sections/settings_root.dart';

class SetInitialSettingStateAction extends ReduxAction<GlobalAppState> {
  final Settings settings;

  SetInitialSettingStateAction(this.settings);

  @override
  FutureOr<GlobalAppState?> reduce() {
    return state.copyWith(
      settingsState: state.settingsState.copyWith(settings: settings),
      networkState: state.networkState.withLoadingSourceRemoved(
        LoadingSource.databaseSettings,
      ),
    );
  }
}
