
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/navigation/business/entities/navigation_item_id.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';

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
