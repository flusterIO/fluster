import 'package:fluster/state/command_palette/actions/set_command_palette_open.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster/static/constants/static_constants.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:fluster_ui/widgets/command_palette_container.dart';
import 'package:fluster/widgets/layout/notifications/desktop_notification.dart';
import 'package:fluster/widgets/layout/window_title_bar/title_bar.dart';
import 'package:fluster/widgets/scaffolds/desktop/desktop_resize_group.dart';
import 'package:fluster/widgets/scaffolds/desktop/desktop_sidebar.dart';
import 'package:flutter/material.dart';

class DesktopAppScaffold extends StatelessWidget {
  const DesktopAppScaffold({required this.child, super.key});
  final Widget child;

  void setCommandPaletteOpen(bool isOpen) =>
      globalReduxStore.dispatch(SetCommandPaletteOpenAction(isOpen));

  @override
  Widget build(BuildContext context) {
    final ShadTheme? theme = Theme.of(context).extension<ShadTheme>();
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
      children.add(
        CommandPalette(
          setIsOpen: setCommandPaletteOpen,
          isOpen: context.state.commandPaletteState.open,
          items: context.state.commandPaletteState.items
        ),
      );
    }
    return Scaffold(
      primary: true,
      backgroundColor: theme?.background,
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
