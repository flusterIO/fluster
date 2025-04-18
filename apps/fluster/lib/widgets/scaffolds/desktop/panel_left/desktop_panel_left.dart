import 'package:fluster/static/enums/navigation_item_id.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/bibliography/bibliography_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/bookmarks/bookmarks_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/connect/connect_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/dashboard/dashboard_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/settings/dashboard_panel.dart';
import 'package:flutter/material.dart';

class DesktopPanelLeftSwitch extends StatelessWidget {
  const DesktopPanelLeftSwitch({super.key});
  @override
  Widget build(BuildContext context) {
    // final sideMenuState = ref.watch(sideMenuProvider);
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
      child: () {
        switch (context.state.navigationState.navigationId) {
          case NavigationItemId.home:
            return DashboardSideMenuPanel();
          case NavigationItemId.connect:
            return ConnectSideMenuPanel();
          case NavigationItemId.bookmarks:
            return BookmarksSideMenuPanel();
          case NavigationItemId.bibliography:
            return BibliographySideMenuPanel();
          case NavigationItemId.settings:
            return SettingsSideMenuPanel();
        }
      }(),
    );
  }
}
