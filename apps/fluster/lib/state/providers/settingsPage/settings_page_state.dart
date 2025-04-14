import 'package:fluster/static/settings/setting_categories.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "settings_page_state.freezed.dart";

@freezed
class SettingsPageState with _$SettingsPageState {
  const factory SettingsPageState({
    required SettingCategory activeCategoryId,
  }) = _SettingsPageState;
}
