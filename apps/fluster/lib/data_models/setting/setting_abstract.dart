import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:fluster/storage/kv/engines/key_value_storage_engine.dart';

abstract class SettingAbstract<T> {
  final T? value;
  final T defaultValue;
  final String label;
  final String? desc;
  final SettingUniqueKey settingUniqueKey;
  final SettingPageInputId inputKey;
  final KeyValueStorageEngine kv;
  const SettingAbstract({
    required this.value,
    required this.defaultValue,
    required this.label,
    required this.settingUniqueKey,
    required this.inputKey,
    required this.desc,
    required this.kv,
  });

  String getFormattedId() {
    return "s-${settingUniqueKey.toString()}";
  }

  Future<T> save();
  Future<void> read();
}
