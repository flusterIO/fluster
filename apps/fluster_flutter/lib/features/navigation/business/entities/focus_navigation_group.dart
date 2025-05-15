import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/features/settings/data/models/keymap_setting_page_data.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';

class FocusNavigationGroup {
  final GlobalAction? focusRight;
  final GlobalAction? focusLeft;
  final GlobalAction? focusUp;
  final GlobalAction? focusDown;
  const FocusNavigationGroup({
    required this.focusRight,
    required this.focusLeft,
    required this.focusUp,
    required this.focusDown,
  });

  static FocusNavigationGroup fromKeymapSettings(
    KeymapSettingPageData settings,
  ) {
    // final x = [SettingUniqueKey.keymapFocusItemUp] as KeymapSetting).action;
    return FocusNavigationGroup(
      focusUp:
          (settings.sections[KeymapSectionId.navigation]?.items[SettingUniqueKey
                      .keymapFocusItemDown]
                  as KeymapSetting)
              .action,
      focusDown:
          (settings.sections[KeymapSectionId.navigation]?.items[SettingUniqueKey
                      .keymapFocusItemDown]
                  as KeymapSetting)
              .action,
      focusRight:
          (settings.sections[KeymapSectionId.navigation]?.items[SettingUniqueKey
                      .keymapFocusItemRight]
                  as KeymapSetting)
              .action,
      focusLeft:
          (settings.sections[KeymapSectionId.navigation]?.items[SettingUniqueKey
                      .keymapFocusItemLeft]
                  as KeymapSetting)
              .action,
    );
  }
}
