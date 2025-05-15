import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_input_id.dart';

abstract class SettingAbstract<T> {
  final T? value;
  final T defaultValue;
  final String label;
  final String? desc;
  final SettingUniqueKey settingUniqueKey;
  final SettingPageInputId inputKey;
  const SettingAbstract({
    required this.value,
    required this.defaultValue,
    required this.label,
    required this.settingUniqueKey,
    required this.inputKey,
    required this.desc,
  });

  String getFormattedId() {
    return "s-${settingUniqueKey.toString()}";
  }

  Future<T> save();
  Future<void> read();
}
