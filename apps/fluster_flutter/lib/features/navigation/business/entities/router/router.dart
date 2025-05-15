import 'package:fluster/features/onboarding/presentation/screens/desktop/initial_setup_onboarding.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'routes.dart';

final GlobalKey<NavigatorState> appShellNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'app shell');

final GlobalKey<NavigatorState> onboardingNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'onboarding navigator');

final GlobalKey<NavigatorState> mainAppScaffoldKey = GlobalKey<NavigatorState>(
  debugLabel: 'main app',
);

final GlobalKey<NavigatorState> parentRouterKey = GlobalKey<NavigatorState>(
  debugLabel: 'routerKey',
);

final appRouter = GoRouter(
  navigatorKey: parentRouterKey,
  // initialLocation: const SplashScreenRoute().location,
  // initialLocation: initialPath,
  // TODO: Set this to the splash screen and use that time to determine whether or not the user has their database configured.
  initialLocation: HomeScreenRoute().location,
  debugLogDiagnostics: true,
  routes: <RouteBase>[
    ShellRoute(
      routes: <RouteBase>[$splashScreenRoute],
      navigatorKey: appShellNavigatorKey,
      parentNavigatorKey: parentRouterKey,
      builder: (BuildContext context, GoRouterState routerState, Widget child) {
        // FLUTTER_MULTI_PLATFORM_WARNING: Platform switch goes here!
        return child;
      },
    ),
    ShellRoute(
      routes: <RouteBase>[$commandPaletteRoute, $homeScreenRoute],
      navigatorKey: mainAppScaffoldKey,
      parentNavigatorKey: parentRouterKey,
      builder: (BuildContext context, GoRouterState routerState, Widget child) {
        // FLUTTER_MULTI_PLATFORM_WARNING: Platform switch goes here!
        return DesktopAppScaffold(child: child);
      },
    ),
    ShellRoute(
      routes: <RouteBase>[
        $originsOfFlusterOnboardingRoute,
        $tourOfFlusterOnboardingRoute,
        $locationOfNotesOnboardingRoute,
        $setupOnboardingStepRoute,
        $onboardingScreenRoute,
      ],
      navigatorKey: onboardingNavigatorKey,
      parentNavigatorKey: parentRouterKey,
      builder: (BuildContext context, GoRouterState routerState, Widget child) {
        // FLUTTER_MULTI_PLATFORM_WARNING: Platform switch goes here!
        return InitialOnboardingDesktopScreen(child: child);
      },
    ),
  ],
);
