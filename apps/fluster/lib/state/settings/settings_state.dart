import 'dart:async';

import 'package:fluster/state/network/actions/set_loading_action.dart';
import 'package:fluster/state/network/network_state.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster_ui/widgets/command_palette_container.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:fluster/static/settings/settings_root.dart';

part "settings_state.freezed.dart";

// TODO: Write settings to the database even if they aren't modified, and test the reading of them here.
@freezed
class SettingsState with _$SettingsState {
  const SettingsState._();
  const factory SettingsState({
    required Settings settings,

    /// false initially, and set to true after the database is read and the settings have been set appropriately.
    @Default(false) bool hasSeeded,
  }) = _SettingsState;
  static SettingsState initialState() =>
      SettingsState(settings: Settings.initialSettings());
  static Future<void> readDatabaseAndSeed() async {
    globalReduxStore.dispatch(
      SetLoadingAction(true, LoadingSource.databaseSettings),
    );
    final t = Timer(Duration(seconds: 3), () => {});
    t.cancel();
    // RESUME: Come back here immediately. This is where the seeding needs to happen.
    // rust.
    globalReduxStore.dispatch(
      SetLoadingAction(false, LoadingSource.databaseSettings),
    );
  }
}
