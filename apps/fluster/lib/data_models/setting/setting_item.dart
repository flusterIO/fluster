import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:shared_preferences/shared_preferences.dart';

// RESUME: Come back here and implement the toString and fromString methods to properly parse and store each keymap as a string. Check the keys and format in the main.dart/app.dart file and adjust accordingly.
class KeymapSetting extends SettingAbstract<String> {
  const KeymapSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.id,
    required super.inputKey,
    super.desc,
  });

  @override
  void setValue(SharedPreferences prefs, String value) {
    prefs.setString(getFormattedId(), value);
  }

  @override
  Future<String> read() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(getFormattedId()) ?? defaultValue;
  }
}

class StringSetting extends SettingAbstract<String> {
  const StringSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.id,
    required super.inputKey,
    super.desc,
  });

  @override
  void setValue(SharedPreferences prefs, String value) {
    prefs.setString(getFormattedId(), value);
  }

  @override
  Future<String> read() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(getFormattedId()) ?? defaultValue;
  }
}

class BoolSetting extends SettingAbstract<bool> {
  const BoolSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.id,
    required super.inputKey,
    super.desc,
  });

  @override
  void setValue(SharedPreferences prefs, bool value) {
    prefs.setBool(getFormattedId(), value);
  }

  @override
  Future<bool> read() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getBool(getFormattedId()) ?? defaultValue;
  }
}

class IntSetting extends SettingAbstract<int> {
  const IntSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.id,
    required super.inputKey,
    super.desc,
  });

  @override
  void setValue(SharedPreferences prefs, int value) {
    prefs.setInt(getFormattedId(), value);
  }

  @override
  Future<int> read() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getInt(getFormattedId()) ?? defaultValue;
  }
}

class DoubleSetting extends SettingAbstract<double> {
  const DoubleSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.id,
    required super.inputKey,
    super.desc,
  });

  @override
  void setValue(SharedPreferences prefs, double value) {
    prefs.setDouble(getFormattedId(), value);
  }

  @override
  Future<double> read() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getDouble(getFormattedId()) ?? defaultValue;
  }
}

class StringListSetting extends SettingAbstract<List<String>> {
  const StringListSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.id,
    required super.inputKey,
    super.desc,
  });

  void appendAndSave(SharedPreferences prefs, List<String> value) {
    prefs.setStringList(getFormattedId(), value);
  }

  @override
  void setValue(SharedPreferences prefs, List<String> value) {
    prefs.setStringList(getFormattedId(), value);
  }

  @override
  Future<List<String>> read() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getStringList(getFormattedId()) ?? defaultValue;
  }
}
