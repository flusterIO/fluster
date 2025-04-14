import 'package:fluster/data_models/structs/navigation_item.dart';
import 'package:fluster/state/providers/panelLeft/panel_left_provider.dart';
import 'package:fluster/state/providers/side_menu_desktop/provider.dart';
import 'package:fluster/static/data/navigation_items.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ResponsiveNavigationRail extends ConsumerWidget {
  const ResponsiveNavigationRail({super.key});

  List<Widget> getItems(
    List<NavigationItem> items,
    BuildContext context,
    ShadTheme theme,
    WidgetRef ref,
  ) {
    return List.generate(items.length, (int idx) {
      final active = ref.watch(sideMenuProvider).selectedId == items[idx].id;
      return Container(
        decoration: BoxDecoration(
          border: Border(
            left: BorderSide(
              color: active ? theme.primary : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        padding: EdgeInsets.symmetric(horizontal: 8),
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () {
              if (active) {
                final currentState = ref.read(panelLeftProvider);
                ref.read(panelLeftProvider.notifier).state = currentState
                    .copyWith(open: !currentState.open);
              } else {
                items[idx].navigate(context, ref);
                final id = items[idx].id;
                if (id != null) {
                  ref.read(sideMenuProvider.notifier).state.selectedId = id;
                }
              }
            },
            child: Icon(
              items[idx].icon,
              color:
                  active
                      ? theme.foreground
                      : Theme.of(context).unselectedWidgetColor,
            ),
          ),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    SideMenuState data = SideMenuState();
    final ShadTheme theme = Theme.of(context).extension<ShadTheme>()!;
    return Container(
      decoration: BoxDecoration(
        border: Border(right: BorderSide(width: 1, color: theme.border)),
      ),
      // width: 64,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              spacing: 16,
              children: getItems(data.menu, context, theme, ref),
            ),
            Column(
              spacing: 16,
              children: getItems(data.bottomSideMenuItems, context, theme, ref),
            ),
          ],
        ),
      ),
    );
  }
}
