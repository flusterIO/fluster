import 'package:fluster/core/global_actions/global_actions/command_palette_back.dart';
import 'package:fluster/core/global_actions/global_actions/global_actions.dart';
import 'package:fluster/core/global_actions/global_actions/select_item_direction.dart';
import 'package:fluster/core/global_actions/global_actions/toggle_command_palette.dart';
import 'package:fluster/core/storage/kv/engines/shared_preferences_keyvalue_engine.dart';
import 'package:fluster/features/panel_left/models/global_actions.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_input_id.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';

// TEST: Add test to ensure that all keys match the settingUniqueKey field, as that can't be statically typed.
KeymapSettingPageData getKeymapSettings() {
  final kv = SharedPreferencesEngine();
  return KeymapSettingPageData<KeymapSetting>(
    label: "Keymap",
    desc: "View or modify your keyboard shortcuts.",
    sections: {
        KeymapSectionId.uiAndLayout: SettingSection(
        label: "UI & Layout",
        items: {
          SettingUniqueKey.keymapTogglePanelLeft: KeymapSetting(
            keymapType: KeymapEntryType.global,
            label: "Toggle left panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelLeft,
            action: toggleLeftPanelGlobalAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapTogglePanelRight: KeymapSetting(
            keymapType: KeymapEntryType.global,
            label: "Toggle right panel",
            settingUniqueKey: SettingUniqueKey.keymapTogglePanelRight,
            action: toggleRightGlobalPanelAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapOpenCommandPalette: KeymapSetting(
            keymapType: KeymapEntryType.global,
            label: "Open command palette",
            settingUniqueKey: SettingUniqueKey.keymapOpenCommandPalette,
            action: openCommandPaletteAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapCommandPaletteBack: KeymapSetting(
            keymapType: KeymapEntryType.commandPaletteInput,
            label: "Back <Command Palette>",
            settingUniqueKey: SettingUniqueKey.keymapCommandPaletteBack,
            action: commandPaletteBackAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
        },
      ),
      KeymapSectionId.navigation: SettingSection(
        label: "Navigation",
        items: {
          SettingUniqueKey.keymapSelectItemDown: KeymapSetting(
            keymapType: KeymapEntryType.commandPaletteInput,
            label: "Select item down",
            settingUniqueKey: SettingUniqueKey.keymapSelectItemDown,
            action: selectItemDownGlobalAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),

          SettingUniqueKey.keymapSelectItemUp: KeymapSetting(
            keymapType: KeymapEntryType.commandPaletteInput,
            label: "Select item down",
            settingUniqueKey: SettingUniqueKey.keymapSelectItemUp,
            action: selectItemUpGlobalAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapSelectItemRight: KeymapSetting(
            keymapType: KeymapEntryType.commandPaletteInput,
            label: "Select item down",
            settingUniqueKey: SettingUniqueKey.keymapSelectItemRight,
            action: selectItemRightGlobalAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
          SettingUniqueKey.keymapSelectItemLeft: KeymapSetting(
            keymapType: KeymapEntryType.commandPaletteInput,
            label: "Select item down",
            settingUniqueKey: SettingUniqueKey.keymapSelectItemLeft,
            action: selectItemLeftGlobalAction,
            inputKey: SettingPageInputId.keymapEntry,
            value: null,
            defaultValue: "",
            kv: kv,
          ),
        },
      ),
    },
  );
}
