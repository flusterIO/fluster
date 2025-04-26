import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/navigation/business/entities/navigation_item_id.dart';
import 'package:fluster/features/navigation/state/actions/navigation_actions.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

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
      icon: FontAwesomeIcons.house,
      title: 'Home',
      navigate: (BuildContext context) {
        globalReduxStore.dispatch(SetNavigationIdAction(NavigationItemId.home));
      },
    ),
    NavigationItem(
      id: NavigationItemId.connect,
      icon: FontAwesomeIcons.networkWired,
      title: 'Connect',
      navigate: (BuildContext context) {
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.connect),
        );
      },
    ),
    NavigationItem(
      id: NavigationItemId.bookmarks,
      icon: FontAwesomeIcons.bookOpen,
      title: 'Bookmarks',
      navigate: (BuildContext context) {
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.bookmarks),
        );
      },
    ),
    NavigationItem(
      id: NavigationItemId.bibliography,
      icon: FontAwesomeIcons.school,
      title: 'Bibliography',
      navigate: (BuildContext context) {
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.bibliography),
        );
      },
    ),
  ];

  final List<NavigationItem> bottomSideMenuItems = <NavigationItem>[
    NavigationItem(
      icon: FontAwesomeIcons.microchip,
      title: 'Sync',
      navigate: (BuildContext context) async {
        // await syncDirectory(ref);
      },
    ),
    NavigationItem(
      id: NavigationItemId.settings,
      icon: FontAwesomeIcons.gears,
      title: 'Settings',
      navigate: (BuildContext context) {
        globalReduxStore.dispatch(
          SetNavigationIdAction(NavigationItemId.settings),
        );
      },
    ),
  ];
}
