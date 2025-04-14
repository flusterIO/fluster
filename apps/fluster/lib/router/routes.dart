import 'package:fluster/widgets/screens/bibliography/bibliography_screen.dart';
import 'package:fluster/widgets/screens/bookmarks/bookmarks_screen.dart';
import 'package:fluster/widgets/screens/connect/connect_screen.dart';
import 'package:fluster/widgets/screens/dashboard/dashboard_desktop.dart';
import 'package:fluster/widgets/screens/notes/byId/notes_by_id_route.dart';
import 'package:fluster/widgets/screens/notes/root/notes_main_route.dart';
import 'package:fluster/widgets/screens/settings/settings_screen.dart';
import 'package:fluster/widgets/screens/spash/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

part 'routes.g.dart';

// class NoTransitionRoute extends GoRoute {
//   const NoTransitionRoute({builder, super.path});

//   @override
//   Duration get transitionDuration => const Duration(milliseconds: 0);
// }

@TypedGoRoute<HomeScreenRoute>(
  path: '/dashboard',
  routes: <TypedRoute<RouteData>>[
    // TypedGoRoute<SettingsRoute>(path: 'settings')
  ],
)
@immutable
class HomeScreenRoute extends GoRouteData {
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

@TypedGoRoute<NotesRoute>(
  path: '/notes',
  routes: [TypedGoRoute<NoteByIdRoute>(path: 'notes/:id')],
)
@immutable
class NotesRoute extends GoRouteData {
  const NotesRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<NotesRouteRoot>(
      child: NotesRouteRoot(key: state.pageKey),
    );
  }
}

@immutable
class NoteByIdRoute extends GoRouteData {
  const NoteByIdRoute({required this.id});

  final int id;

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage<NoteByIdRoute>(
      child: NoteByIdScreen(key: state.pageKey, id: id),
    );
  }
}
