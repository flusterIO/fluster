import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:flutter/material.dart';

class KeymapSettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T, KeymapSectionId> {
  const KeymapSettingPageData({
    required super.label,
    required super.desc,
    required super.sections,
    super.id = SettingPageId.keymap,
  });

  Map<ShortcutActivator, VoidCallback> toCallbackShortcuts(BuildContext context) {
    var data = <ShortcutActivator, VoidCallback>{};
    for (var sec in sections.values) {
      for (var k in sec.items.keys) {
        final km = (sec.items[k] as KeymapSetting);
        if (km.keymapType == KeymapEntryType.global &&
            km.action.activator != null) {
          data[km.action.activator!] = () {
            final f = globalActionMap[km.action.globalActionId];
            if (f != null) {
              f(context);
            }
          };
        }
      }
    }
    return data;
  }

  KeymapSetting getSettingById(SettingUniqueKey id) {
    for (var s in sections.values) {
      if (s.items.containsKey(id)) {
        return s.items[id] as KeymapSetting;
      }
    }
    throw FormatException(
      "Attemptd to getSettingById in the keymap setting class with an invalid key $id",
    );
  }
}
