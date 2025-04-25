import 'package:fluster/core/static/constants/static_constants.dart';
import 'package:fluster/core/static/global_keys.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_resize_group.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_sidebar.dart';
import 'package:fluster/features/scaffold/presentation/widgets/title_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class DesktopAppScaffold extends HookWidget {
  const DesktopAppScaffold({required this.child, super.key});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      primary: true,
      backgroundColor: theme.scaffoldBackgroundColor,
      key: desktopScaffoldKey,
      body: SafeArea(
        child: Column(
          children: [
            WindowTitleBar(),
            Expanded(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 0,
                mainAxisSize: MainAxisSize.max,
                children: [
                  ResponsiveNavigationRail(),
                  SizedBox(
                    width:
                        MediaQuery.sizeOf(context).width - appBarHeightOffset,
                    child: DesktopResizeGroup(child: child),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
