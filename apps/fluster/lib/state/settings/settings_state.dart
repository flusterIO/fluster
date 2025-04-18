import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:fluster/static/settings/settings_root.dart';

part "settings_state.freezed.dart";


// TODO: Write settings to the database even if they aren't modified, and test the reading of them here.
@freezed
class SettingsState with _$SettingsState {
  const factory SettingsState({
    required Settings? settings,
    @Default(true) bool isLoading,
  }) = _SettingsState;
 static SettingsState initialState() => SettingsState(settings: getInitialSettings(), isLoading: true);
}
