import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/navigation/business/entities/navigation_item_id.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:fluster/features/navigation/presentation/state/actions/navigation_actions.dart';
import 'package:flutter/material.dart';

// import 'package:ulld_native/src/routes/routes.dart';
// import 'package:ulld_native/src/state/methods/sync.dart';
// import 'package:ulld_native/src/state/providers/database/database_utils.dart';
// import 'package:ulld_native/src/widgets/scaffolds/scaffoldWidgets/sideMenu/responsiveRail/menu_model.dart';
// import 'package:ulld_native/static/enums/side_menu_item_id.dart';
class NavigationItem {
  const NavigationItem({
    required this.icon,
    required this.title,
    required this.navigate,
    this.id,
  });
  final IconData icon;
  final String title;
  final NavigationItemId? id;
  final Function(BuildContext) navigate;
}

class SideMenuState {
  SideMenuState();
  NavigationItemId selectedId = NavigationItemId.home;

  final List<NavigationItem> menu = <NavigationItem>[
    NavigationItem(
      id: NavigationItemId.home,
      icon: FluentIcons.home_32_regular,
      title: 'Home',
      navigate: (BuildContext context) {
        HomeScreenRoute().go(context);
        globalReduxStore.dispatch(SetNavigationIdAction(NavigationItemId.home));
      },
    ),
    NavigationItem(
      id: NavigationItemId.connect,
      icon: FluentIcons.connected_32_regular,
      title: 'Connect',
      navigate: (BuildContext context) {
        ConnectRoute().go(context);
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.connect),
        );
      },
    ),
    NavigationItem(
      id: NavigationItemId.bookmarks,
      icon: FluentIcons.bookmark_32_regular,
      title: 'Bookmarks',
      navigate: (BuildContext context) {
        BookmarksRoute().go(context);
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.bookmarks),
        );
      },
    ),
    NavigationItem(
      id: NavigationItemId.bibliography,
      icon: FluentIcons.book_template_20_regular,
      title: 'Bibliography',
      navigate: (BuildContext context) {
        BibliographyRoute().go(context);
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.bibliography),
        );
      },
    ),
  ];

  final List<NavigationItem> bottomSideMenuItems = <NavigationItem>[
    NavigationItem(
      icon: FluentIcons.database_lightning_20_regular,
      title: 'Sync',
      navigate: (BuildContext context) async {
        // await syncDirectory(ref);
      },
    ),
    NavigationItem(
      id: NavigationItemId.settings,
      icon: FluentIcons.settings_32_regular,
      title: 'Settings',
      navigate: (BuildContext context) {
        SettingsRoute().go(context);
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.settings),
        );
      },
    ),
  ];
}
