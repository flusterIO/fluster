import 'package:fluster/data_models/data_manager/data_manager_abstract.dart';
import 'package:fluster/static/settings/settings_root.dart';

class LocalDataManager extends DataManager {
  const LocalDataManager();

  @override
  Future<Settings> saveSettings(Settings newSettings) {
    // TODO: implement saveSettings
    throw UnimplementedError();
  }
}
