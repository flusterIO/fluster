import 'package:fluster/data_models/actions/global_actions/toggle_command_palette.dart';
import 'package:fluster/data_models/actions/global_actions/toggle_left_panel.dart';
import 'package:fluster/data_models/actions/global_actions/toggle_right_panel.dart';
import 'package:fluster/data_models/setting/setting_implementations/keymap_setting.dart';
import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
import 'package:fluster/storage/kv/engines/shared_preferences_keyvalue_engine.dart';

KeymapSettingPageData getKeymapSettings() {
  final kv = SharedPreferencesEngine();
  return KeymapSettingPageData<KeymapSetting>(
    label: "Keymap",
    desc: "View or modify your keyboard shortcuts.",
    sections: [
      SettingSection(
        label: "UI & Layout",
        items: [
          KeymapSetting(
            keymapType: KeymapEntryType.Global,
            label: "Toggle left panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelLeft,
            action: getToggleLeftPanelAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          KeymapSetting(
            keymapType: KeymapEntryType.Global,
            label: "Toggle right panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelRight,
            action: getToggleRightPanelAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          KeymapSetting(
            keymapType: KeymapEntryType.Global,
            label: "Open command palette",
            settingUniqueKey: SettingUniqueKey.keymapOpenCommandPalette,
            action: getOpenCommandPaletteAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          KeymapSetting(
            keymapType: KeymapEntryType.CommandPaletteInput,
            label: "Back <Command Palette>",
            settingUniqueKey: SettingUniqueKey.keymapCommandPaletteBack,
            action: getOpenCommandPaletteAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
        ],
      ),
      SettingSection(label: "Navigation", items: [
        ],
      ),
    ],
  );
}
