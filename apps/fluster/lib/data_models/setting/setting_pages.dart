import 'package:fluster/data_models/setting/setting_abstract.dart';
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
  Map<ShortcutActivator, Intent> toAppScaffoldProp() {
    var m = <ShortcutActivator, Intent>{};
    for (var sec in sections) {
      for (var km in sec.items) {
        // RESUME: Come back here
        // m[km.activator]
      }
    }
    return m;
  }

  Future<KeymapSettingPageData> setDatabaseKeymap() async {
    // FIX: Fix this immediately. Right now, no user settings will be applied.
    return this;
  }
}
