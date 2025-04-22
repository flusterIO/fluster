import "package:fluster/data_models/actions/global_actions/toggle_left_panel.dart";
import "package:fluster/data_models/setting/setting_implementations/keymap_setting.dart";
import "package:fluster/data_models/setting/setting_keys.dart";
import "package:fluster/data_models/setting/setting_page_input_id.dart";
import "package:fluster/storage/kv/engines/shared_preferences_keyvalue_engine.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  late KeymapSetting sut;
  setUp(() {
    sut = KeymapSetting(
      value: null,
      defaultValue: "",
      label: "Settings panel right",
      settingUniqueKey: SettingUniqueKey.keymapTogglePanelRight,
      inputKey: SettingPageInputId.keymapEntry,
      action: getToggleLeftPanelAction(),
      kv: SharedPreferencesEngine(),
      keymapType: KeymapEntryType.Global,
    );
  });
  group("Parses keymap properly", () {
    test("Formats to string properly", () {
      // Arrange
      var s = sut..action.toFormattedString();

      print("s is: {s}");
      // Act

      // Assert
      expect(s, "", reason: "test");
    });
  });
}
