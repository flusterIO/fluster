import "package:fluster/core/storage/kv/engines/shared_preferences_keyvalue_engine.dart";
import "package:fluster/features/panel_left/presentation/state/actions/toggle_panel_left.dart";
import "package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart";
import "package:fluster/features/settings/data/models/setting_keys.dart";
import "package:fluster/features/settings/data/models/setting_page_input_id.dart";
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
      keymapType: KeymapEntryType.global,
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
