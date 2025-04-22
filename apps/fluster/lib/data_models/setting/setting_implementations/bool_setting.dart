import 'package:fluster/data_models/setting/setting_abstract.dart';

class BoolSetting extends SettingAbstract<bool> {
  const BoolSetting({
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
  Future<bool> save() {
    // TODO: implement save
    throw UnimplementedError();
  }
}
