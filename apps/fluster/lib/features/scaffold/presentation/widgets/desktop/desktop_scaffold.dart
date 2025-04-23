import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/core/static/constants/static_constants.dart';
import 'package:fluster/features/command_palette/presentation/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/notifications/presentation/widgets/desktop/desktop_notification.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_resize_group.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_sidebar.dart';
import 'package:fluster/features/scaffold/presentation/widgets/title_bar.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster_ui/widgets/command_palette_container.dart';
import 'package:flutter/material.dart';

class DesktopAppScaffold extends StatelessWidget {
  const DesktopAppScaffold({required this.child, super.key});
  final Widget child;

  void setCommandPaletteOpen(bool isOpen) =>
      globalReduxStore.dispatch(SetCommandPaletteOpenAction(isOpen));

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final children = [
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 0,
        mainAxisSize: MainAxisSize.max,
        children: [
          ResponsiveNavigationRail(),
          SizedBox(
            width: MediaQuery.sizeOf(context).width - appBarHeightOffset,
            child: DesktopResizeGroup(child: child),
          ),
        ],
      ),
      NotificationsContainerDesktop(),
    ];
    final commandPaletteOpen = context.state.commandPaletteState.open;
    if (commandPaletteOpen) {
      final s =
          context.state.settingsState.settings.pages[SettingPageId.keymap]
              as KeymapSettingPageData;
      children.add(
        CommandPalette(
          setIsOpen: setCommandPaletteOpen,
          isOpen: context.state.commandPaletteState.open,
          items: context.state.commandPaletteState.items,
          listeners: s.getKeyboardListeners(),
        ),
      );
    }
    return Scaffold(
      primary: true,
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            WindowTitleBar(),
            Expanded(
              child: Stack(
                // fit: StackFit.expand,
                children: children,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
