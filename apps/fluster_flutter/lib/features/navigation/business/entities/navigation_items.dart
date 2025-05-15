import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/navigation/business/entities/navigation_item_id.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;

class NavigationItem {
  const NavigationItem({
    required this.icon,
    required this.title,
    required this.href,
    required this.onClick,
    this.id,
  });
  final IconData icon;
  final String title;
  final NavigationItemId? id;
  final String? href;
  final void Function()? onClick;
}

class SideMenuState {
  SideMenuState();
  NavigationItemId selectedId = NavigationItemId.home;

  final List<NavigationItem> menu = <NavigationItem>[
    NavigationItem(
      id: NavigationItemId.home,
      icon: FontAwesomeIcons.house,
      title: 'Home',
      href: HomeScreenRoute().location,
      onClick: null,
    ),
    NavigationItem(
      id: NavigationItemId.connect,
      icon: FontAwesomeIcons.networkWired,
      title: 'Connect',
      href: ConnectRoute().location,
      onClick: null,
    ),
    NavigationItem(
      id: NavigationItemId.bookmarks,
      icon: FontAwesomeIcons.bookOpen,
      title: 'Bookmarks',
      href: BookmarksRoute().location,
      onClick: null,
    ),
    NavigationItem(
      id: NavigationItemId.bibliography,
      icon: FontAwesomeIcons.school,
      title: 'Bibliography',
      href: BibliographyRoute().location,
      onClick: null,
    ),
  ];

  final List<NavigationItem> bottomSideMenuItems = <NavigationItem>[
    NavigationItem(
      icon: FontAwesomeIcons.microchip,
      title: 'Sync',
      href: null,
      onClick: () {
        // FIXME: Create a method that just gets a setting by SettingUniqueKey from the settings state class and then pass that to this method to sync the db.
        // final state =
        // native.syncDirectory(dirName: globalReduxStore.state.settingsState.settings.pages[])
      },
      // id: NavigationItemId.jVgc
      // navigate: (BuildContext context) async {
      //   await syncDirectory(ref);
      // },
    ),
    NavigationItem(
      id: NavigationItemId.settings,
      icon: FontAwesomeIcons.gears,
      title: 'Settings',
      href: SettingsRoute().location,
      onClick: null,
    ),
  ];
}
