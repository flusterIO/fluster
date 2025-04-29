import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_container.dart';
import 'package:fluster/features/dashboard/presentation/screens/desktop/dashboard_desktop.dart';
import 'package:fluster/features/onboarding/presentation/screens/desktop/initial_setup_onboarding.dart';
import 'package:fluster/features/onboarding/presentation/screens/desktop/steps/a_little_about_fluster.dart';
import 'package:fluster/features/onboarding/presentation/screens/desktop/steps/location_of_notes.dart';
import 'package:fluster/features/onboarding/presentation/screens/desktop/steps/origins_of_fluster.dart';
import 'package:fluster/features/onboarding/presentation/screens/desktop/steps/permission_to_setup.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_scaffold.dart';
import 'package:fluster/features/splash/presentation/screens/desktop/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

part 'routes.g.dart';

class RouteNames {
  static const String home = "home";
  static const String commandPalette = "commandPalette";
  static const String bibliography = "bibliography";
  static const String connect = "connect";
  static const String settings = "settings";
  static const String dashboard = "dashboard";
  static const String snippetsList = "snippetsList";
  static const String splash = "splash";
  static const String bookmarks = "bookmarks";
  static const String onboarding = "onboarding";
  static const String onboardingSetup = "onboarding-setup";
  static const String onboardingLocationOfNotes = "onboarding-location";
  static const String onboardingTourOfFluster = "onboarding-tour";
  static const String onboardingOriginsOfFluster = "onboarding-origins";
  static const String noteById = "noteById";
}

@TypedGoRoute<CommandPaletteRoute>(
  path: '/commandPalette',
  name: RouteNames.commandPalette,
  routes: [],
)
@immutable
class CommandPaletteRoute extends GoRouteData {
  const CommandPaletteRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<CommandPalette>(
      child: CommandPaletteWidget(key: state.pageKey),
    );
  }
}

// @TypedGoRoute<DashboardRoute>(
//   path: '/dashboard',
//   name: RouteNames.dashboard,
//   routes: <TypedRoute<RouteData>>[
//     // TypedGoRoute<SettingsRoute>(path: 'settings')
//   ],
// )
// @immutable
// class DashboardRoute extends GoRouteData {
//   const DashboardRoute();
//   @override
//   Page<void> buildPage(BuildContext context, GoRouterState state) {
//     return NoTransitionPage<Dashboard>(child: Dashboard(key: state.pageKey));
//   }
// }

@TypedGoRoute<SplashScreenRoute>(
  path: '/splash',
  name: RouteNames.splash,
  routes: <TypedRoute<RouteData>>[
    // TypedGoRoute<SettingsRoute>(path: 'settings')
  ],
)
@immutable
class SplashScreenRoute extends GoRouteData {
  const SplashScreenRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<SplashScreen>(
      child: SplashScreen(key: state.pageKey),
    );
  }
}

@TypedGoRoute<OriginsOfFlusterOnboardingRoute>(
  path: '/onboarding/originsOfFluster',
  name: RouteNames.onboardingOriginsOfFluster,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class OriginsOfFlusterOnboardingRoute extends GoRouteData {
  const OriginsOfFlusterOnboardingRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return OriginsOfFlusterStep(key: state.pageKey);
  }
}

@TypedGoRoute<TourOfFlusterOnboardingRoute>(
  path: '/onboarding/tour',
  name: RouteNames.onboardingTourOfFluster,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class TourOfFlusterOnboardingRoute extends GoRouteData {
  const TourOfFlusterOnboardingRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return ALittleAboutFlusterStep(key: state.pageKey);
  }
}

@TypedGoRoute<LocationOfNotesOnboardingRoute>(
  path: '/onboarding/locationOfNotes',
  name: RouteNames.onboardingLocationOfNotes,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class LocationOfNotesOnboardingRoute extends GoRouteData {
  const LocationOfNotesOnboardingRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return LocationOfNotesStep(key: state.pageKey);
  }
}

@TypedGoRoute<SetupOnboardingStepRoute>(
  path: '/onboarding/setup',
  name: RouteNames.onboardingSetup,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class SetupOnboardingStepRoute extends GoRouteData {
  const SetupOnboardingStepRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return PermissionToSetupStep(key: state.pageKey);
  }
}

@TypedGoRoute<OnboardingScreenRoute>(
  path: '/onboarding',
  name: RouteNames.onboarding,
  routes: <TypedRoute<RouteData>>[
    TypedGoRoute<SetupOnboardingStepRoute>(path: '/onboarding/setup'),
    TypedGoRoute<TourOfFlusterOnboardingRoute>(path: '/onboarding/tour'),
    TypedGoRoute<LocationOfNotesOnboardingRoute>(
      path: '/onboarding/locationOfNotes',
    ),
    TypedGoRoute<OriginsOfFlusterOnboardingRoute>(
      path: '/onboarding/originsOfFluster',
    ),
  ],
)
@immutable
class OnboardingScreenRoute extends GoRouteData {
  const OnboardingScreenRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<InitialOnboardingDesktopScreen>(
      child: InitialOnboardingDesktopScreen(
        key: state.pageKey,
        child: Placeholder(),
      ),
    );
  }
}

@TypedGoRoute<SettingsRoute>(
  path: '/settings',
  name: RouteNames.snippetsList,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class SettingsRoute extends GoRouteData {
  const SettingsRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<SettingsRoute>(child: Placeholder());
  }
}

@TypedGoRoute<BookmarksRoute>(
  path: '/bookmarks',
  name: RouteNames.bookmarks,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class BookmarksRoute extends GoRouteData {
  const BookmarksRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<BookmarksRoute>(child: Placeholder());
  }
}

@TypedGoRoute<ConnectRoute>(
  path: '/connect',
  name: RouteNames.connect,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class ConnectRoute extends GoRouteData {
  const ConnectRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<ConnectRoute>(child: Placeholder());
  }
}

@TypedGoRoute<SnippetsListRoute>(
  path: '/snippets',
  name: RouteNames.snippetsList,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class SnippetsListRoute extends GoRouteData {
  const SnippetsListRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<SnippetsListRoute>(child: Placeholder());
  }
}

@TypedGoRoute<BibliographyRoute>(
  path: '/bibliography',
  name: RouteNames.bibliography,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class BibliographyRoute extends GoRouteData {
  const BibliographyRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<BibliographyRoute>(child: Placeholder());
  }
}

@TypedGoRoute<DashboardRoute>(
  path: '/dashboard',
  name: RouteNames.dashboard,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class DashboardRoute extends GoRouteData {
  const DashboardRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<DashboardRoute>(child: Placeholder());
  }
}

@TypedGoRoute<NoteByIdRoute>(
  path: '/note/:noteId',
  name: RouteNames.noteById,
  routes: <TypedRoute<RouteData>>[],
)
@immutable
class NoteByIdRoute extends GoRouteData {
  final int noteId;
  const NoteByIdRoute({required this.noteId});

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    final id = state.pathParameters['userId'];
    print("NoteId: {id}");
    return NoTransitionPage<NoteByIdRoute>(child: Placeholder());
  }
}

@TypedGoRoute<HomeScreenRoute>(
  path: '/',
  name: RouteNames.home,
  routes: <TypedRoute<RouteData>>[
    // TypedGoRoute<CommandPaletteRoute>(path: "/commandPalette"),
    TypedGoRoute<OnboardingScreenRoute>(path: "/onboarding"),
    TypedGoRoute<DashboardRoute>(path: "/dashboard"),
    TypedGoRoute<SettingsRoute>(path: "/settings"),
    TypedGoRoute<ConnectRoute>(path: "/connect"),
    TypedGoRoute<BibliographyRoute>(path: "/bibliography"),
    TypedGoRoute<BookmarksRoute>(path: "/bookmarks"),
  ],
)
@immutable
class HomeScreenRoute extends GoRouteData {
  const HomeScreenRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<DesktopAppScaffold>(child: Dashboard());
  }
}
