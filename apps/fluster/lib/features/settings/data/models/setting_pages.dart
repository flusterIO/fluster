import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';
import 'package:flutter/material.dart';


abstract class SettingPageDataAbstract<T extends SettingAbstract, J> {
  final String label;
  final String desc;
  final SettingPageId id;
  final Map<J, SettingSection<T>> sections;
  const SettingPageDataAbstract({
    required this.label,
    required this.desc,
    required this.id,
    required this.sections,
  });
}

class SettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T, SettingSections> {
  const SettingPageData({
    required super.label,
    required super.desc,
    required super.id,
    required super.sections,
  });
}

class KeymapSettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T, KeymapSectionId> {
  const KeymapSettingPageData({
    required super.label,
    required super.desc,
    required super.sections,
    super.id = SettingPageId.keymap,
  });

  Map<ShortcutActivator, VoidCallback> toCallbackShortcuts() {
    var data = <ShortcutActivator, VoidCallback>{};
    for (var sec in sections.values) {
      for (var k in sec.items.keys) {
        final km = (sec.items[k] as KeymapSetting);
        if (km.keymapType == KeymapEntryType.global &&
            km.action.activator != null) {
          data[km.action.activator!] = () =>
              callGlobalAction(km.action.globalActionId);
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
