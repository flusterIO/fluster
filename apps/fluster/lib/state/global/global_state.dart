import 'package:fluster/state/command_palette/command_palette_state.dart';
import 'package:fluster/state/error/error_state.dart';
import 'package:fluster/state/navigation/navigation_state.dart';
import 'package:fluster/state/notifications/notification_state.dart';
import 'package:fluster/state/settings/settings_state.dart';
import 'package:fluster/state/network/network_state.dart';
import 'package:fluster/state/ui/ui_state.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "global_state.freezed.dart";

@freezed
class GlobalAppState with _$GlobalAppState {
  const factory GlobalAppState({
    required SettingsState settingsState,
    required NetworkState networkState,
    required GlobalErrorState errorState,
    required GlobalUIState uiState,
    required NavigationState navigationState,
    required GlobalNotificationState notificationState,
    required CommandPaletteState commandPaletteState,
  }) = _GlobalAppState;
  static GlobalAppState initialState() => GlobalAppState(
    settingsState: SettingsState.initialState(),
    networkState: NetworkState.initialState(),
    errorState: GlobalErrorState.initialState(),
    uiState: GlobalUIState.initialState(),
    navigationState: NavigationState.initialState(),
    notificationState: GlobalNotificationState.initialState(),
    commandPaletteState: CommandPaletteState.initialState(),
  );
}
