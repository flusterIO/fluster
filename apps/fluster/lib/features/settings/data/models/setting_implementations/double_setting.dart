import 'package:fluster/features/settings/data/models/setting_abstract.dart';

class DoubleSetting extends SettingAbstract<double> {
  const DoubleSetting({
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
  Future<double> save() {
    // TODO: implement save
    throw UnimplementedError();
  }
}
