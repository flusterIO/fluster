import 'package:fluster/core/state/nested_state/error_state/error_state.dart';
import 'package:fluster/core/state/nested_state/layout_state/ui_state.dart';
import 'package:fluster/core/state/nested_state/network_state/network_state.dart';
import 'package:fluster/features/command_palette/presentation/state/command_palette_state.dart';
import 'package:fluster/features/navigation/presentation/state/navigation_state.dart';
import 'package:fluster/features/notifications/presentation/state/notification_state.dart';
import 'package:fluster/features/settings/state/settings/settings_state.dart';
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
