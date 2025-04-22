import 'package:async_redux/async_redux.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/state/command_palette/actions/set_command_palette_open.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster/state/ui/panels/panel_left/actions/panel_left_actions.dart';
import 'package:fluster/state/ui/panels/panel_right/actions/panel_right_actions.dart';
import 'package:flutter/material.dart';

class WindowTitleBar extends StatelessWidget {
  const WindowTitleBar({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        border: BorderDirectional(
          bottom: BorderSide(
            width: 1,
            color:
                theme.textTheme.bodyMedium?.color?.withOpacity(0.1) ??
                theme.primaryColor.withValues(alpha: 0.05),
          ),
        ),
      ),
      child: WindowTitleBarBox(
        child: MoveWindow(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  CloseWindowButton(),
                  MinimizeWindowButton(),
                  MaximizeWindowButton(),
                ],
              ),
              Container(
                decoration: BoxDecoration(
                  color: theme.textTheme.bodyMedium?.color?.withValues( 
                                        alpha: 0.1
                                    ),
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                ),
                child: GestureDetector(
                  onTap: () {
                    // showCommandPalette(context);
                    globalReduxStore.dispatch(
                      SetCommandPaletteOpenAction(true),
                    );
                  },
                  child: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        vertical: 1,
                        horizontal: 32,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        spacing: 8,
                        children: [
                          Icon(Icons.search, size: 14),
                          Text("Search"),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  spacing: 8,
                  children: [
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          context.dispatch(TogglePanelLeftAction());
                        },
                        child: Icon(
                          FluentIcons.align_left_32_filled,
                          // color: shadTheme.mutedForeground,
                          size: 20,
                        ),
                      ),
                    ),
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          context.dispatch(TogglePanelRightAction());
                        },
                        child: Icon(
                          FluentIcons.align_right_32_filled,
                          // color: shadTheme.mutedForeground,
                          size: 20,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
