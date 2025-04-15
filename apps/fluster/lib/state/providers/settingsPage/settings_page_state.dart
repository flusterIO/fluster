import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "settings_page_state.freezed.dart";

@freezed
class SettingsPageState with _$SettingsPageState {
  const factory SettingsPageState({
    required SettingPageId activeCategoryId,
  }) = _SettingsPageState;
}
