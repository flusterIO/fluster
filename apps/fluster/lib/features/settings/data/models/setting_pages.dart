import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/core/models/key_press_listener/key_press_listener.dart';
import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';
import 'package:flutter/material.dart';

enum SettingPageId { webInterface, ui, keymap, general, ai, searchAndTaggables }

abstract class SettingPageDataAbstract<T extends SettingAbstract> {
  final String label;
  final String desc;
  final SettingPageId id;
  final List<SettingSection<T>> sections;
  const SettingPageDataAbstract({
    required this.label,
    required this.desc,
    required this.id,
    required this.sections,
  });
}

class SettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T> {
  const SettingPageData({
    required super.label,
    required super.desc,
    required super.id,
    required super.sections,
  });
}

class KeymapSettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T> {
  const KeymapSettingPageData({
    required super.label,
    required super.desc,
    required super.sections,
    super.id = SettingPageId.keymap,
  });

  Map<ShortcutActivator, VoidCallback> toCallbackShortcuts() {
    var data = <ShortcutActivator, VoidCallback>{};
    for (var sec in sections) {
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

  List<FlusterKeyPressListener> getKeyboardListeners() {
    var data = <FlusterKeyPressListener>[];
    for (var s in sections) {
      for (var k in s.items.keys) {
        final km = s.items[k] as KeymapSetting;
        if (km.keymapType == KeymapEntryType.commandPaletteInput) {
          data.add(FlusterKeyPressListener(listener: km.handleKeyPress));
        }
      }
    }
    return data;
  }
}
