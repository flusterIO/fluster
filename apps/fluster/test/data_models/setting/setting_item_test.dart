import "package:fluster/features/settings/data/setting_sections/settings_root.dart";
import "package:fluster/features/settings/state/settings/settings_state.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  late SettingsState sut;

  setUp(() {
    sut = SettingsState(settings: Settings.initialSettings());
  });
  group("Structure is typesafe.", () {
    test("All keys are in place.", () {
      for (var x in sut.settings.pages.values) {
        for (var y in x.sections.values) {
          for (var k in y.items.entries) {
            expect(
              k.key,
              k.value.settingUniqueKey,
              reason:
                  "The settingUniqueKey field in a keymap setting must match the key in SettingsPageData[section].",
            );
          }
        }
      }
      // for (var s in sut.sections.values) {
      //   for (var k in s.items.entries) {
      //   }
      // }
    });
  });
}
