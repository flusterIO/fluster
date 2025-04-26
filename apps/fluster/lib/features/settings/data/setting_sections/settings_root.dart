import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';
import 'package:fluster/features/settings/data/setting_by_category/keymap/keymap.dart';
import 'package:fluster/features/settings/data/setting_by_category/syncing/syncing_settings.dart';
import 'package:fluster/features/settings/data/setting_sections/general/general_settings.dart';

class Settings {
  final Map<SettingPageId, SettingPageDataAbstract> pages;
  final bool isSeeded = false;
  const Settings({required this.pages});

  static Settings initialSettings() {
    return Settings(
      pages: {
        SettingPageId.general: SettingPageData(
          id: SettingPageId.general,
          label: "General",
          desc: "General purpose settings.",
          sections: {
            SettingSections.general: SettingSection(
              label: "General Purpose Settings",
              subtitle: "Some test subtitle",
              items: getGeneralSettings(),
            ),
          },
        ),
        SettingPageId.keymap: getKeymapSettings(),
        SettingPageId.searchAndTaggables: SettingPageData(
          id: SettingPageId.searchAndTaggables,
          label: "Search & Organization",
          desc: "Settings related to tagging, searching and linking.",
          sections: {},
        ),
        SettingPageId.ui: SettingPageData(
          id: SettingPageId.ui,
          label: "UI",
          desc: "Change the appearance of your application",
          sections: {},
        ),
        SettingPageId.webInterface: SettingPageData(
          id: SettingPageId.webInterface,
          label: "Web Interface",
          desc:
              "Settings related to the nested web interface. Only modify these if you know what you're doing.",
          sections: {},
        ),
        SettingPageId.syncingAndDatabase: getSyncynAndSettingPageData(),
      },
    );
  }
}
