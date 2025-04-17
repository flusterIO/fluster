import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';

final generalSettings = <SettingAbstract>[
  StringSetting(
    value: null,
    defaultValue: "",
    label: "Path to .bib file",
    id: SettingUniqueKey.bibpath,
    inputKey: SettingPageInputId.rootRelativeFilePath,
  ),
];
