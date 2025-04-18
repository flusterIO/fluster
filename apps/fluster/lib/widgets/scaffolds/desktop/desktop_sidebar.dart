import 'package:fluster/data_models/structs/navigation_item.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster/state/ui/panels/panel_left/actions/panel_left_actions.dart';
import 'package:fluster/static/data/navigation_items.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';

class ResponsiveNavigationRail extends StatelessWidget {
  const ResponsiveNavigationRail({super.key});

  List<Widget> getItems(
    List<NavigationItem> items,
    BuildContext context,
    ShadTheme theme,
  ) {
    return List.generate(items.length, (int idx) {
      final active =
          context.state.navigationState.navigationId == items[idx].id;
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
                globalReduxStore.dispatch(TogglePanelLeftAction());
              } else {
                items[idx].navigate(context);
                final id = items[idx].id;
                if (id != null) {
                  // ref.read(sideMenuProvider.notifier).state.selectedId = id;
                }
              }
            },
            child: Icon(
              items[idx].icon,
              color:
                  active
                      ? theme.foreground
                      : theme.foreground.withOpacity(0.85),
            ),
          ),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
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
            Column(spacing: 16, children: getItems(data.menu, context, theme)),
            Column(
              spacing: 16,
              children: getItems(data.bottomSideMenuItems, context, theme),
            ),
          ],
        ),
      ),
    );
  }
}
