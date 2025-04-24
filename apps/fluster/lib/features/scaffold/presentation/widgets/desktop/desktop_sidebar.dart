import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/navigation/business/entities/navigation_items.dart';
import 'package:fluster/features/panel_left/state/actions/toggle_panel_left.dart';
import 'package:flutter/material.dart';

class ResponsiveNavigationRail extends StatelessWidget {
  const ResponsiveNavigationRail({super.key});

  List<Widget> getItems(
    List<NavigationItem> items,
    BuildContext context,
    ThemeData theme,
  ) {
    return List.generate(items.length, (int idx) {
      final active =
          context.state.navigationState.navigationId == items[idx].id;
      return Container(
        decoration: BoxDecoration(
          border: Border(
            left: BorderSide(
              color: active ? theme.primaryColor : Colors.transparent,
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
              color: active
                  ? theme.textTheme.bodyLarge!.color
                  : theme.textTheme.bodyLarge!.color!.withOpacity(0.85),
            ),
          ),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    SideMenuState data = SideMenuState();
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        border: Border(
          right: BorderSide(
            width: 1,
            color:
                theme.textTheme.titleMedium?.color?.withOpacity(0.2) ??
                Colors.transparent,
          ),
        ),
      ),
      // width: 64,
      // height: MediaQuery.sizeOf(context).height,
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
