import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_implementations/string_setting.dart';
import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:fluster/storage/kv/engines/key_value_storage_engine.dart';
import 'package:flutter/material.dart';

List<SettingAbstract> getGeneralSettings(KeyValueStorageEngine engine) {
  return <SettingAbstract>[
    StringSetting(
      value: null,
      defaultValue: ThemeMode.dark.toString(),
      label: "Dark Mode",
      settingUniqueKey: SettingUniqueKey.darkmode,
      inputKey: SettingPageInputId.darkmode,
      kv: engine,
    ),
    StringSetting(
      value: null,
      defaultValue: "",
      label: "Path to .bib file",
      settingUniqueKey: SettingUniqueKey.bibpath,
      inputKey: SettingPageInputId.rootRelativeFilePath,
      kv: engine,
    ),
  ];
}
