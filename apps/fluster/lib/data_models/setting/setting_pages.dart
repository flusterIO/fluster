import 'package:fluster/data_models/actions/global_action_map.dart';
import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_implementations/keymap_setting.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
import 'package:fluster_ui/widgets/command_palette_container.dart';
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
      for (var km in sec.items) {
        if ((km as KeymapSetting).keymapType == KeymapEntryType.Global &&
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
      for (var k in s.items) {
        if ((k as KeymapSetting).keymapType ==
            KeymapEntryType.CommandPaletteInput) {
          data.add(FlusterKeyPressListener(listener: k.handleKeyPress));
        }
      }
    }
    return data;
  }
}
