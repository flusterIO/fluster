import "package:fluster/data_models/actions/global_actions/toggle_left_panel.dart";
import "package:fluster/data_models/setting/setting_item.dart";
import "package:fluster/data_models/setting/setting_keys.dart";
import "package:fluster/data_models/setting/setting_page_input_id.dart";
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
    );
  });
  group("Parses keymap properly", () {
    test("Formats to string properly", () {
      // Arrange
      var s = sut.action.valueToString();

    print("s is: {s}");
      // Act

      // Assert
      assert(s != "");
    });
  });
}
