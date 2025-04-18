import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';

class SetSettingsPage extends FlusterAction {
  final SettingPageId id;
  SetSettingsPage(this.id);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      navigationState: state.navigationState.copyWith(settingPageId: id)
    );
  }
}
