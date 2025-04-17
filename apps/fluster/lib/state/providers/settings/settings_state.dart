import 'package:freezed_annotation/freezed_annotation.dart';

part "settings_state.freezed.dart";

@freezed
class SettingsState with _$SettingsState {
  const factory SettingsState({
    /// in seconds.
    @Default(10) defaultNotificationDuration,
  }) = _SettingsState;
}
