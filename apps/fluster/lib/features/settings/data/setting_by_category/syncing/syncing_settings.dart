import 'package:fluster/core/static/constants/static_constants.dart';
import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/string_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:fluster/features/settings/data/models/setting_page_input_id.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';
import 'package:flutter/foundation.dart';

enum SyncingAndDatabaseSettingSectionId { directorySettings }

SettingPageData<SettingAbstract, SyncingAndDatabaseSettingSectionId>
getSyncynAndSettingPageData() {
  return SettingPageData(
    label: "",
    desc: "",
    id: SettingPageId.syncingAndDatabase,
    sections: {
      SyncingAndDatabaseSettingSectionId.directorySettings: SettingSection(
        label: "",
        subtitle: "",
        items: {
          SettingUniqueKey.notesDirectoryRootPath: StringSetting(
            value: kDebugMode ? developmentTestNotesDir : "",
            defaultValue: kDebugMode ? developmentTestNotesDir : "",
            label: "",
            settingUniqueKey: SettingUniqueKey.notesDirectoryRootPath,
            inputKey: SettingPageInputId.systemWidePath,
          ),
        },
      ),
    },
  );
}
