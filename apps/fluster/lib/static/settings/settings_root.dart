import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
import 'package:fluster/static/settings/setting_by_category/keymap.dart';
import 'package:fluster/static/settings/setting_sections/general/general_settings.dart';

class Settings {
  final List<SettingPageDataAbstract> pages;
  final bool isSeeded = false;
  const Settings({required this.pages});
  SettingPageDataAbstract getPageById<T extends SettingAbstract>(
    SettingPageId id,
  ) {
    return pages.firstWhere((x) => x.id == id) as SettingPageDataAbstract<T>;
  }

  /// Reads all settings from the database and returns a new instance with settings applied from the database.
  Future<Settings> toSeeded() async {
    // FIX: Set all settings here, and return the new instance.
    return this;
  }
}

Settings getInitialSettings() {
  return Settings(
    pages: [
      SettingPageData(
        id: SettingPageId.general,
        label: "General",
        desc: "General purpose settings.",
        sections: [
          SettingSection(
            label: "General Purpose Settings",
            subtitle: "Some test subtitle",
            items: generalSettings,
          ),
        ],
      ),
      getKeymapSettings(),
      SettingPageData(
        id: SettingPageId.searchAndTaggables,
        label: "Search & Organization",
        desc: "Settings related to tagging, searching and linking.",
        sections: [ 
            ]),
      SettingPageData(
        id: SettingPageId.ui,
        label: "UI",
        desc: "Change the appearance of your application",
        sections: [ 
            ]),
      SettingPageData(
        id: SettingPageId.webInterface,
        label: "Web Interface",
        desc:
            "Settings related to the nested web interface. Only modify these if you know what you're doing.",
        sections: [ 
            ]),
    ],
  );
}
