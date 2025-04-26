import 'package:fluster/features/bibliography/presentation/screens/desktop/bibliography_screen.dart';
import 'package:fluster/features/dashboard/presentation/screens/desktop/dashboard_desktop.dart';
import 'package:fluster/features/navigation/business/entities/navigation_item_id.dart';
import 'package:fluster/features/peer_to_peer/presentation/screens/desktop/connect_screen.dart';
import 'package:flutter/material.dart';

import 'package:fluster/features/bookmarks/presentation/screens/desktop/bookmarks_screen.dart';
import 'package:fluster/features/settings/presentation/screens/settings_screen.dart';

class MainPaneSwitch extends StatelessWidget {
  final NavigationItemId id;
  const MainPaneSwitch({super.key, required this.id});
  @override
  Widget build(BuildContext context) {
    return switch (id) {
      NavigationItemId.home => Dashboard(),
      NavigationItemId.bookmarks => BookmarksScreen(),
      NavigationItemId.bibliography => BibliographyScreen(),
      NavigationItemId.connect => ConnectScreen(),
      NavigationItemId.settings => SettingsScreen(),
    };
  }
}
