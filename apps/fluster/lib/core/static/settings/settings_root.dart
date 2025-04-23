import 'package:fluster/core/static/settings/setting_by_category/keymap.dart';
import 'package:fluster/core/static/settings/setting_sections/general/general_settings.dart';
import 'package:fluster/core/storage/kv/engines/shared_preferences_keyvalue_engine.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';

class Settings {
  final Map<SettingPageId, SettingPageDataAbstract> pages;
  final bool isSeeded = false;
  const Settings({required this.pages});

  static Settings initialSettings() {
    final kv = SharedPreferencesEngine();
    return Settings(
      pages: {
        SettingPageId.general: SettingPageData(
          id: SettingPageId.general,
          label: "General",
          desc: "General purpose settings.",
          sections: [
            SettingSection(
              label: "General Purpose Settings",
              subtitle: "Some test subtitle",
              items: getGeneralSettings(kv),
            ),
          ],
        ),
        SettingPageId.keymap: getKeymapSettings(),
        SettingPageId.searchAndTaggables: SettingPageData(
          id: SettingPageId.searchAndTaggables,
          label: "Search & Organization",
          desc: "Settings related to tagging, searching and linking.",
          sections: [ 
            ]),
        SettingPageId.ui: SettingPageData(
          id: SettingPageId.ui,
          label: "UI",
          desc: "Change the appearance of your application",
          sections: [ 
            ]),
        SettingPageId.webInterface: SettingPageData(
          id: SettingPageId.webInterface,
          label: "Web Interface",
          desc:
              "Settings related to the nested web interface. Only modify these if you know what you're doing.",
          sections: [ 
            ]),
      },
    );
  }
}
