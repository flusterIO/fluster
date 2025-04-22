import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
import 'package:fluster/static/settings/setting_by_category/keymap.dart';
import 'package:fluster/static/settings/setting_sections/general/general_settings.dart';
import 'package:flutter/widgets.dart';

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
          sections: [
            SettingSection(
              label: "General Purpose Settings",
              subtitle: "Some test subtitle",
              items: generalSettings,
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

  Map<ShortcutActivator, VoidCallback> toCallbackShortcuts() {
    var data = <ShortcutActivator, VoidCallback>{};
    for (var sec
        in (pages[SettingPageId.keymap] as KeymapSettingPageData).sections) {
      for (var km in sec.items) {
        data[(km as KeymapSetting).action.activator] = km.action.callback;
      }
    }
    return data;
  }
}
