import 'package:fluster/widgets/scaffolds/desktop/desktop_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'routes.dart';

final GlobalKey<NavigatorState> appShellNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'app shell');

final GlobalKey<NavigatorState> parentRouterKey = GlobalKey<NavigatorState>(
  debugLabel: 'routerKey',
);

final router = GoRouter(
  navigatorKey: parentRouterKey,
  // initialLocation: const SplashScreenRoute().location,
  initialLocation: HomeScreenRoute().location,
  debugLogDiagnostics: true,
  routes: <RouteBase>[
    ShellRoute(
      routes: $appRoutes,
      navigatorKey: appShellNavigatorKey,
      builder: (BuildContext context, GoRouterState routerState, Widget child) {
        // FLUTTER_MULTI_PLATFORM_WARNING: Platform switch goes here!
        return DesktopAppScaffold(child: child);
      },
    ),
  ],
);
