import 'package:fluster/state/providers/side_menu_desktop/provider.dart';
import 'package:fluster/static/enums/navigation_item_id.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/bibliography/bibliography_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/bookmarks/bookmarks_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/connect/connect_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/dashboard/dashboard_panel.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/panels/settings/dashboard_panel.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class DesktopPanelLeftSwitch extends ConsumerWidget {
  const DesktopPanelLeftSwitch({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sideMenuState = ref.watch(sideMenuProvider);
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
      child: () {
        switch (sideMenuState.selectedId) {
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
