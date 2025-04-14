import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/state/providers/panelLeft/panel_left_provider.dart';
import 'package:fluster/state/providers/panelRight/panel_right_provider.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
// import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:ulld_native/src/state/providers/panelLeft/panel_left_provider.dart';
// import 'package:ulld_native/src/state/providers/panelRight/panel_right_provider.dart';
// import 'package:ulld_native/static/styles/shadThemes/shad_theme.dart';

class WindowTitleBar extends ConsumerWidget {
  const WindowTitleBar({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final shadTheme = Theme.of(context).extension<ShadTheme>()!;
    return Container(
      decoration: BoxDecoration(
        border: BorderDirectional(bottom: BorderSide(color: shadTheme.border)),
      ),
      child: WindowTitleBarBox(
        child: MoveWindow(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Row(
                children: [
                  MinimizeWindowButton(),
                  MaximizeWindowButton(),
                  CloseWindowButton(),
                ],
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
                          final currentState = ref.read(panelLeftProvider);
                          ref.read(panelLeftProvider.notifier).state =
                              currentState.copyWith(open: !currentState.open);
                        },
                        child: Icon(
                          FluentIcons.align_left_32_filled,
                          color: shadTheme.mutedForeground,
                          size: 20,
                        ),
                      ),
                    ),
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          final currentState = ref.read(panelRightProvider);
                          ref.read(panelRightProvider.notifier).state =
                              currentState.copyWith(open: !currentState.open);
                        },
                        child: Icon(
                          FluentIcons.align_right_32_filled,
                          color: shadTheme.mutedForeground,
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
