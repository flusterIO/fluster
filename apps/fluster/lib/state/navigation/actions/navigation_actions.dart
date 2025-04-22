import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/static/enums/navigation_item_id.dart';
import 'package:fluster/types/state_types.dart';

class SetSettingsPageAction extends FlusterAction {
  final SettingPageId id;
  SetSettingsPageAction(this.id);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      navigationState: state.navigationState.copyWith(settingPageId: id)
    );
  }
}



class SetNavigationIdAction extends FlusterAction {
  final NavigationItemId id;
  SetNavigationIdAction(this.id);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
            navigationState: state.navigationState.copyWith(navigationId: id)
    );
  }
}
