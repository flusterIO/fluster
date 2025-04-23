import 'package:fluster/core/storage/kv/engines/shared_preferences_keyvalue_engine.dart';
import 'package:fluster/features/command_palette/presentation/state/actions/toggle_command_palette.dart';
import 'package:fluster/features/panel_left/presentation/state/actions/toggle_panel_left.dart';
import 'package:fluster/features/panel_right/presentation/state/actions/toggle_panel_right.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_input_id.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';

KeymapSettingPageData getKeymapSettings() {
  final kv = SharedPreferencesEngine();
  return KeymapSettingPageData<KeymapSetting>(
    label: "Keymap",
    desc: "View or modify your keyboard shortcuts.",
    sections: [
      SettingSection(
        label: "UI & Layout",
        items: {
          SettingUniqueKey.keymapTogglePanelLeft: KeymapSetting(
            keymapType: KeymapEntryType.global,
            label: "Toggle left panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelLeft,
            action: getToggleLeftPanelAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapTogglePanelRight: KeymapSetting(
            keymapType: KeymapEntryType.global,
            label: "Toggle right panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelRight,
            action: getToggleRightPanelAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
           SettingUniqueKey.keymapOpenCommandPalette: KeymapSetting(
            keymapType: KeymapEntryType.global,
            label: "Open command palette",
            settingUniqueKey: SettingUniqueKey.keymapOpenCommandPalette,
            action: getOpenCommandPaletteAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapCommandPaletteBack: KeymapSetting(
            keymapType: KeymapEntryType.commandPaletteInput,
            label: "Back <Command Palette>",
            settingUniqueKey: SettingUniqueKey.keymapCommandPaletteBack,
            action: getOpenCommandPaletteAction(),
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
            },
      ),
      SettingSection(label: "Navigation", items: {}
      ),
    ],
  );
}
