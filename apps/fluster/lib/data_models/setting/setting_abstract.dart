import 'package:fluster/data_models/setting/setting_keys.dart';
import 'package:fluster/data_models/setting/setting_page_input_id.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class SettingAbstract<T> {
  final T? value;
  final T defaultValue;
  final String label;
  final String? desc;
  final SettingUniqueKey id;
  final SettingPageInputId inputKey;
  const SettingAbstract({
    required this.value,
    required this.defaultValue,
    required this.label,
    required this.id,
    required this.inputKey,
    required this.desc,
  });

  String getFormattedId() {
        return "s-${id.toString()}";
    }

  Future<T> read();

  void setValue(SharedPreferences prefs, T value);

  Future<void> update(T value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    setValue(prefs, value);
  }
}
