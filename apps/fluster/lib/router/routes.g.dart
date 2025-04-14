// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'routes.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
  $homeScreenRoute,
  $splashScreenRoute,
  $settingsRoute,
  $connectRoute,
  $bibliographyRoute,
  $bookmarksRoute,
  $notesRoute,
];

RouteBase get $homeScreenRoute => GoRouteData.$route(
  path: '/dashboard',

  factory: $HomeScreenRouteExtension._fromState,
);

extension $HomeScreenRouteExtension on HomeScreenRoute {
  static HomeScreenRoute _fromState(GoRouterState state) => HomeScreenRoute();

  String get location => GoRouteData.$location('/dashboard');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $splashScreenRoute => GoRouteData.$route(
  path: '/splash',

  factory: $SplashScreenRouteExtension._fromState,
);

extension $SplashScreenRouteExtension on SplashScreenRoute {
  static SplashScreenRoute _fromState(GoRouterState state) =>
      const SplashScreenRoute();

  String get location => GoRouteData.$location('/splash');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $settingsRoute => GoRouteData.$route(
  path: '/settings',

  factory: $SettingsRouteExtension._fromState,
);

extension $SettingsRouteExtension on SettingsRoute {
  static SettingsRoute _fromState(GoRouterState state) => const SettingsRoute();

  String get location => GoRouteData.$location('/settings');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $connectRoute => GoRouteData.$route(
  path: '/connect',

  factory: $ConnectRouteExtension._fromState,
);

extension $ConnectRouteExtension on ConnectRoute {
  static ConnectRoute _fromState(GoRouterState state) => const ConnectRoute();

  String get location => GoRouteData.$location('/connect');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $bibliographyRoute => GoRouteData.$route(
  path: '/bibliography',

  factory: $BibliographyRouteExtension._fromState,
);

extension $BibliographyRouteExtension on BibliographyRoute {
  static BibliographyRoute _fromState(GoRouterState state) =>
      const BibliographyRoute();

  String get location => GoRouteData.$location('/bibliography');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $bookmarksRoute => GoRouteData.$route(
  path: '/bookmarks',

  factory: $BookmarksRouteExtension._fromState,
);

extension $BookmarksRouteExtension on BookmarksRoute {
  static BookmarksRoute _fromState(GoRouterState state) =>
      const BookmarksRoute();

  String get location => GoRouteData.$location('/bookmarks');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $notesRoute => GoRouteData.$route(
  path: '/notes',

  factory: $NotesRouteExtension._fromState,
  routes: [
    GoRouteData.$route(
      path: 'notes/:id',

      factory: $NoteByIdRouteExtension._fromState,
    ),
  ],
);

extension $NotesRouteExtension on NotesRoute {
  static NotesRoute _fromState(GoRouterState state) => const NotesRoute();

  String get location => GoRouteData.$location('/notes');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

extension $NoteByIdRouteExtension on NoteByIdRoute {
  static NoteByIdRoute _fromState(GoRouterState state) =>
      NoteByIdRoute(id: int.parse(state.pathParameters['id']!)!);

  String get location => GoRouteData.$location(
    '/notes/notes/${Uri.encodeComponent(id.toString())}',
  );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}
