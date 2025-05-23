import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/data_models/structs/navigation_item.dart';
import 'package:fluster/router/routes.dart';
import 'package:fluster/static/enums/navigation_item_id.dart';
import 'package:flutter/material.dart';
// import 'package:ulld_native/src/routes/routes.dart';
// import 'package:ulld_native/src/state/methods/sync.dart';
// import 'package:ulld_native/src/state/providers/database/database_utils.dart';
// import 'package:ulld_native/src/widgets/scaffolds/scaffoldWidgets/sideMenu/responsiveRail/menu_model.dart';
// import 'package:ulld_native/static/enums/side_menu_item_id.dart';

class SideMenuState {
  SideMenuState();
  NavigationItemId selectedId = NavigationItemId.home;

  final List<NavigationItem> menu = <NavigationItem>[
    NavigationItem(
      id: NavigationItemId.home,
      icon: FluentIcons.home_32_regular,
      title: 'Home',
      iconType: IconType.Flutter,
      navigate: (BuildContext context) {
        HomeScreenRoute().go(context);
      },
    ),
    NavigationItem(
      id: NavigationItemId.connect,
      iconType: IconType.Flutter,
      icon: FluentIcons.connected_32_regular,
      title: 'Connect',
      navigate: (BuildContext context) {
        ConnectRoute().go(context);
      },
    ),
    NavigationItem(
      id: NavigationItemId.bookmarks,
      icon: FluentIcons.bookmark_32_regular,
      iconType: IconType.Flutter,
      title: 'Bookmarks',
      navigate: (BuildContext context) {
        BookmarksRoute().go(context);
      },
    ),
    NavigationItem(
      id: NavigationItemId.bibliography,
      icon: FluentIcons.book_template_20_regular,
      title: 'Bibliography',
      iconType: IconType.Flutter,
      navigate: (BuildContext context) {
        BibliographyRoute().go(context);
      },
    ),
  ];

  final List<NavigationItem> bottomSideMenuItems = <NavigationItem>[
    NavigationItem(
      icon: FluentIcons.cube_sync_24_regular,
      title: 'Sync',
      iconType: IconType.Flutter,
      navigate: (BuildContext context) async {
        // await syncDirectory(ref);
      },
    ),
    NavigationItem(
      id: NavigationItemId.settings,
      icon: FluentIcons.settings_32_regular,
      title: 'Settings',
      iconType: IconType.Flutter,
      navigate: (BuildContext context) {
        SettingsRoute().go(context);
      },
    ),
  ];
}
