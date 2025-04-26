import 'package:fluster/features/settings/data/models/setting_abstract.dart';

class StringSetting extends SettingAbstract<String> {
  const StringSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.settingUniqueKey,
    required super.inputKey,
    super.desc,
  });

  @override
  Future<void> read() {
    // TODO: implement read
    throw UnimplementedError();
  }

  @override
  Future<String> save() {
    // TODO: implement save
    throw UnimplementedError();
  }
}
