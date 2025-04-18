import 'package:fluster/data_models/actions/global_actions/toggle_left_panel.dart';
import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/data_models/setting/setting_section.dart';

KeymapSettingPageData getKeymapSettings() {
  return KeymapSettingPageData<KeymapSetting>(
    label: "Keymap",
    desc: "View or modify your keyboard shortcuts.",
    sections: [
      SettingSection(
        label: "General",
        items: [
          KeymapSetting(
            label: "Toggle left panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelLeft,
            action: getToggleLeftPanelAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
          ),
        ],
      ),
    ],
  );
}
