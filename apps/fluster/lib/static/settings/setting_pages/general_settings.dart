import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';

const general_settings = SettingsPage(
  label: "General",
  desc: "General purpose settings.",
  pageId: SettingPageId.general,
  items: [
StringSetting(value: null, defaultValue: "", label: "Bibliography path", id: SettingUniqueKey.bibpath, inputKey: SettingPageInputId.rootRelativeFilePath)
    ]
);
