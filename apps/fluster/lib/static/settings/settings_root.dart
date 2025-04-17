import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
import 'package:fluster/static/settings/setting_sections/general/general_settings.dart';

class Settings {
  final List<SettingPageData> pages;
  const Settings({required this.pages});
}

Settings getSettings() {
  return Settings(
    pages: [
      SettingPageData(
        id: SettingPageId.general,
        label: "General",
        desc: "General purpose settings.",
        sections: [SettingSection(
                    label: "General Purpose Settings",
                    subtitle: "Some test subtitle",
                    items: generalSettings
                )],
      ),
      SettingPageData(
        id: SettingPageId.keymap,
        label: "Keymap",
        desc: "View or modify your keyboard shortcuts.",
        sections: [ 
            ]),
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
