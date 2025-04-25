import 'package:fluster/features/bibliography/presentation/screens/desktop/bibliography_screen.dart';
import 'package:fluster/features/bookmarks/presentation/screens/desktop/bookmarks_screen.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette.dart';
import 'package:fluster/features/dashboard/presentation/screens/desktop/dashboard_desktop.dart';
import 'package:fluster/features/peer_to_peer/presentation/screens/desktop/connect_screen.dart';
import 'package:fluster/features/settings/presentation/screens/settings_screen.dart';
import 'package:fluster/features/splash/presentation/screens/desktop/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

part 'routes.g.dart';



@TypedGoRoute<CommandPaletteRoute>(path: '/commandPalette', routes: [])
@immutable
class CommandPaletteRoute extends GoRouteData {
  const CommandPaletteRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<CommandPaletteWidget>(
      child: CommandPaletteWidget(key: state.pageKey),
    );
  }
}


@TypedGoRoute<HomeScreenRoute>(
  path: '/',
  routes: <TypedRoute<RouteData>>[
        TypedGoRoute<CommandPaletteRoute>(path: "/commandPalette"),
  ],
)
@immutable
class HomeScreenRoute extends GoRouteData {
  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<Dashboard>(child: Dashboard(key: state.pageKey));
  }
}


@TypedGoRoute<DashboardRoute>(
  path: '/dashboard',
  routes: <TypedRoute<RouteData>>[
    // TypedGoRoute<SettingsRoute>(path: 'settings')
  ],
)
@immutable
class DashboardRoute extends GoRouteData {
  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<Dashboard>(child: Dashboard(key: state.pageKey));
  }
}

@TypedGoRoute<SplashScreenRoute>(
  path: '/splash',
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

@TypedGoRoute<SettingsRoute>(
  path: '/settings',
  // routes: [],
)
@immutable
class SettingsRoute extends GoRouteData {
  const SettingsRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<SettingsScreen>(
      child: SettingsScreen(key: state.pageKey),
    );
  }
}

@TypedGoRoute<ConnectRoute>(
  path: '/connect',
  // routes: [],
)
@immutable
class ConnectRoute extends GoRouteData {
  const ConnectRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<ConnectScreen>(
      child: ConnectScreen(key: state.pageKey),
    );
  }
}

@TypedGoRoute<BibliographyRoute>(
  path: '/bibliography',
  // routes: [],
)
@immutable
class BibliographyRoute extends GoRouteData {
  const BibliographyRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<BibliographyScreen>(
      child: BibliographyScreen(key: state.pageKey),
    );
  }
}

@TypedGoRoute<BookmarksRoute>(path: '/bookmarks', routes: [])
@immutable
class BookmarksRoute extends GoRouteData {
  const BookmarksRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<BookmarksScreen>(
      child: BookmarksScreen(key: state.pageKey),
    );
  }
}


// @TypedGoRoute<NotesRoute>(
//   path: '/notes',
//   routes: [TypedGoRoute<NoteByIdRoute>(path: 'notes/:id')],
// )
// @immutable
// class NotesRoute extends GoRouteData {
//   const NotesRoute();

//   @override
//   Page<void> buildPage(BuildContext context, GoRouterState state) {
//     return NoTransitionPage<NotesRouteRoot>(
//       child: NotesRouteRoot(key: state.pageKey),
//     );
//   }
// }

// @immutable
// class NoteByIdRoute extends GoRouteData {
//   const NoteByIdRoute({required this.id});

//   final int id;

//   @override
//   Page<void> buildPage(BuildContext context, GoRouterState state) {
//     return NoTransitionPage<NoteByIdRoute>(
//       child: NoteByIdScreen(key: state.pageKey, id: id),
//     );
//   }
// }
