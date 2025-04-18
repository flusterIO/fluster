import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
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
  Map<ShortcutActivator, Intent> toAppScaffoldShortcuts() {
    var m = <ShortcutActivator, Intent>{};
    for (var sec in sections) {
      for (var km in sec.items as List<KeymapSetting>) {
        // m[km.action.activator] = km.action.intent;
      }
    }
    return m;
  }

  Map<Type, Action<Intent>> toAppScaffoldActions() {
    var m = <Type, Action<Intent>>{};
    for (var sec in sections) {
      for (var km in sec.items as List<KeymapSetting>) {
        // RESUME: Pick this back up here. These intents need to match the actions to get things working.
        // m[km.activator] = km.intent;
      }
    }
    return m;
  }

  Future<KeymapSettingPageData> setDatabaseKeymap() async {
    // FIX: Fix this immediately. Right now, no user settings will be applied.
    return this;
  }
}
