// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'routes.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
  $commandPaletteRoute,
  $dashboardRoute,
  $splashScreenRoute,
  $settingsRoute,
  $connectRoute,
  $bibliographyRoute,
  $bookmarksRoute,
  $homeScreenRoute,
];

RouteBase get $commandPaletteRoute => GoRouteData.$route(
  path: '/commandPalette',
  name: 'commandPalette',

  factory: $CommandPaletteRouteExtension._fromState,
);

extension $CommandPaletteRouteExtension on CommandPaletteRoute {
  static CommandPaletteRoute _fromState(GoRouterState state) =>
      const CommandPaletteRoute();

  String get location => GoRouteData.$location('/commandPalette');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $dashboardRoute => GoRouteData.$route(
  path: '/dashboard',
  name: 'dashboard',

  factory: $DashboardRouteExtension._fromState,
);

extension $DashboardRouteExtension on DashboardRoute {
  static DashboardRoute _fromState(GoRouterState state) =>
      const DashboardRoute();

  String get location => GoRouteData.$location('/dashboard');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $splashScreenRoute => GoRouteData.$route(
  path: '/splash',
  name: 'splash',

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
  name: 'settings',

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
  name: 'bibliography',

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
  name: 'bookmarks',

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

RouteBase get $homeScreenRoute => GoRouteData.$route(
  path: '/',
  name: 'home',

  factory: $HomeScreenRouteExtension._fromState,
  routes: [
    GoRouteData.$route(
      path: '/commandPalette',

      factory: $CommandPaletteRouteExtension._fromState,
    ),
    GoRouteData.$route(
      path: '/dashboard',

      factory: $DashboardRouteExtension._fromState,
    ),
    GoRouteData.$route(
      path: '/splash',

      factory: $SplashScreenRouteExtension._fromState,
    ),
    GoRouteData.$route(
      path: '/settings',

      factory: $SettingsRouteExtension._fromState,
    ),
    GoRouteData.$route(
      path: '/connect',

      factory: $ConnectRouteExtension._fromState,
    ),
    GoRouteData.$route(
      path: '/bibliography',

      factory: $BibliographyRouteExtension._fromState,
    ),
    GoRouteData.$route(
      path: '/bookmarks',

      factory: $BookmarksRouteExtension._fromState,
    ),
  ],
);

extension $HomeScreenRouteExtension on HomeScreenRoute {
  static HomeScreenRoute _fromState(GoRouterState state) =>
      const HomeScreenRoute();

  String get location => GoRouteData.$location('/');

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}
