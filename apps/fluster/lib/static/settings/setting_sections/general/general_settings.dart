import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:flutter/material.dart';

final generalSettings = <SettingAbstract>[
  StringSetting(
    value: null,
    defaultValue: ThemeMode.dark.toString(),
    label: "Dark Mode",
    id: SettingUniqueKey.darkmode,
    inputKey: SettingPageInputId.darkmode,
  ),
  StringSetting(
    value: null,
    defaultValue: "",
    label: "Path to .bib file",
    id: SettingUniqueKey.bibpath,
    inputKey: SettingPageInputId.rootRelativeFilePath,
  ),
];
