import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/keymap_setting.dart';
import 'package:fluster/features/settings/data/models/setting_implementations/string_setting.dart';
import 'package:fluster/features/settings/presentation/widgets/setting_inputs/dark_mode_toggle/desktop_dark_mode_toggle.dart';
import 'package:fluster/features/settings/presentation/widgets/setting_inputs/keymap_entry/keymap_entry_input.dart';
import 'package:fluster/features/settings/presentation/widgets/setting_inputs/path_picker/path_picker_input_desktop.dart';
import 'package:flutter/material.dart';
import 'package:fluster/features/settings/data/models/setting_page_input_id.dart';

class SettingPageInput extends StatelessWidget {
  final SettingAbstract item;
  final GlobalKey<FormState> formKey;
  const SettingPageInput({
    super.key,
    required this.item,
    required this.formKey,
  });
  @override
  Widget build(BuildContext context) {
    switch (item.inputKey) {
      case SettingPageInputId.darkmode:
        return DarkModeToggle();
      case SettingPageInputId.keymapEntry:
        return KeymapEntryInput(setting: item as KeymapSetting);
      case SettingPageInputId.rootRelativeFilePath:
        return PathPickerInput(
          formKey: formKey,
          setting: item as StringSetting,
        );
      case SettingPageInputId.systemWidePath:
        return PathPickerInput(
          formKey: formKey,
          setting: item as StringSetting,
        );
    }
  }
}
