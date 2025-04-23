import 'package:fluster/core/storage/kv/engines/key_value_storage_engine.dart';
import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/string_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_input_id.dart';
import 'package:flutter/material.dart';

Map<SettingUniqueKey, SettingAbstract> getGeneralSettings(KeyValueStorageEngine engine) {
  return <SettingUniqueKey, SettingAbstract>{
    SettingUniqueKey.darkmode: StringSetting(
      value: null,
      defaultValue: ThemeMode.dark.toString(),
      label: "Dark Mode",
      settingUniqueKey: SettingUniqueKey.darkmode,
      inputKey: SettingPageInputId.darkmode,
      kv: engine,
    ),
    SettingUniqueKey.bibpath: StringSetting(
      value: null,
      defaultValue: "",
      label: "Path to .bib file",
      settingUniqueKey: SettingUniqueKey.bibpath,
      inputKey: SettingPageInputId.rootRelativeFilePath,
      kv: engine,
    ),
};
}
