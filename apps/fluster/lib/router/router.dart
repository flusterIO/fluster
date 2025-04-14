import 'package:fluster/widgets/scaffolds/desktop/desktop_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import 'routes.dart';

part 'router.g.dart';

final GlobalKey<NavigatorState> appShellNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'app shell');

@riverpod
GoRouter router(Ref ref) {
  final GlobalKey<NavigatorState> routerKey = GlobalKey<NavigatorState>(
    debugLabel: 'routerKey',
  );

  final GoRouter router = GoRouter(
    navigatorKey: routerKey,
    // initialLocation: const SplashScreenRoute().location,
    initialLocation: HomeScreenRoute().location,
    debugLogDiagnostics: true,
    routes: <RouteBase>[
      ShellRoute(
        routes: $appRoutes,
        navigatorKey: appShellNavigatorKey,
        builder: (
          BuildContext context,
          GoRouterState routerState,
          Widget child,
        ) {
            // FLUTTER_MULTI_PLATFORM_WARNING: Platform switch goes here!
            return DesktopAppScaffold(child: child);
          // final size = MediaQuery.sizeOf(context);
          // if (size.width >= 1280) {
          // }
          // return TabletAppScaffold(child: child);
        },
      ),
    ],
  );
  ref.onDispose(router.dispose); // always clean up after yourselves (:
  return router;
}
