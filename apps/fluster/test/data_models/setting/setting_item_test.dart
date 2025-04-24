import "package:fluster/features/settings/data/models/keymap_setting_page_data.dart";
import "package:fluster/features/settings/data/setting_by_category/keymap/keymap.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  late KeymapSettingPageData sut;

  setUp(() {
    sut = getKeymapSettings();
  });
  group("Structure is typesafe.", () {
    test("All keys are in place.", () {
      for (var s in sut.sections.values) {
        for (var k in s.items.entries) {
          expect(
            k.key,
            k.value.settingUniqueKey,
            reason:
                "The settingUniqueKey field in a keymap setting must match the key in SettingsPageData[section].",
          );
        }
      }
    });
  });
}
