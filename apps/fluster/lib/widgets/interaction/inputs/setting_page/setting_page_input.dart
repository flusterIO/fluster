import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_item.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:fluster/widgets/interaction/inputs/setting_page/setting_inputs/dark_mode_toggle/desktop_dark_mode_toggle.dart';
import 'package:fluster/widgets/interaction/inputs/setting_page/setting_inputs/path_picker/path_picker_input_desktop.dart';
import 'package:flutter/material.dart';

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
      case SettingPageInputId.rootRelativeFilePath:
        return PathPickerInput(
          formKey: formKey,
          setting: item as StringSetting,
        );
    }
  }
}
