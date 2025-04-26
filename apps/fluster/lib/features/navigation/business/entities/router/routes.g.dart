// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'routes.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
  $commandPaletteRoute,
  $splashScreenRoute,
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
      path: '/splash',

      factory: $SplashScreenRouteExtension._fromState,
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
