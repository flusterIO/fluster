import 'package:fluster/features/settings/data/models/setting_abstract.dart';

class IntSetting extends SettingAbstract<int> {
  const IntSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.settingUniqueKey,
    required super.inputKey,
    required super.kv,
    super.desc,
  });

  @override
  Future<void> read() {
    // TODO: implement read
    throw UnimplementedError();
  }

  @override
  Future<int> save() {
    // TODO: implement save
    throw UnimplementedError();
  }
}
