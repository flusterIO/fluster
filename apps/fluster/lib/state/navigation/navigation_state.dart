import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/static/enums/navigation_item_id.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "navigation_state.freezed.dart";

@freezed
class NavigationState with _$NavigationState {
  const NavigationState._();
  const factory NavigationState({
    /// This key is used to navigate within the settings page.
    required SettingPageId settingPageId,

    /// This navigation key describes the outtermost navigator.
    required NavigationItemId navigationId,
  }) = _NavigationState;

  static NavigationState initialState() => NavigationState(
    settingPageId: SettingPageId.general,
    navigationId: NavigationItemId.home,
  );

  NavigationState withSettingsPageReset() => NavigationState.initialState();
}
