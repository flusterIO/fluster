import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:fluster/features/panel_left/presentation/widgets/panels/bibliography/bibliography_panel.dart';
import 'package:fluster/features/panel_left/presentation/widgets/panels/bookmarks/bookmarks_panel.dart';
import 'package:fluster/features/panel_left/presentation/widgets/panels/connect/connect_panel.dart';
import 'package:fluster/features/panel_left/presentation/widgets/panels/dashboard/dashboard_panel.dart';
import 'package:fluster/features/panel_left/presentation/widgets/panels/settings/dashboard_panel.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DesktopPanelLeftSwitch extends StatelessWidget {
  const DesktopPanelLeftSwitch({super.key});
  @override
  Widget build(BuildContext context) {
    // final sideMenuState = ref.watch(sideMenuProvider);
        final currentUrl = GoRouter.of(context).routeInformationProvider.value.uri.toString();
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
      child: () {
                if(currentUrl == DashboardRoute().location.toString()) {
                return DashboardSideMenuPanel();
                }
                if(currentUrl == ConnectRoute().location.toString()){
            return ConnectSideMenuPanel();
                }
                if(currentUrl == BibliographyRoute().location.toString()) {

            return BibliographySideMenuPanel();
                }
                if(currentUrl == SettingsRoute().location.toString()) {
            return SettingsSideMenuPanel();
                }
                if(currentUrl == BookmarksRoute().location.toString()) {
            return BookmarksSideMenuPanel();
                }
      }(),
    );
  }
}
