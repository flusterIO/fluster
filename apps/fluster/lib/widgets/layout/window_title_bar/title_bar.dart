import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/state/providers/panelLeft/panel_left_provider.dart';
import 'package:fluster/state/providers/panelRight/panel_right_provider.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

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
                  color: shadTheme.foreground.withOpacity(0.15),
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                ),
                child: GestureDetector(
                  onTap: () {
                    showCommandPalette(context);
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
