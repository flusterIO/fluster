import 'package:fluster/static/styles/brand/brand_styles.dart';
import 'package:fluster/static/styles/shad/shad_theme_generators.dart';
import 'package:flutter/material.dart';

class NoAnimationPageTransitionsBuilder extends PageTransitionsBuilder {
  const NoAnimationPageTransitionsBuilder();

  @override
  Widget buildTransitions<T>(
    PageRoute<T> route,
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    return child;
  }
}

final pageTransitionsTheme = const PageTransitionsTheme(
  builders: <TargetPlatform, PageTransitionsBuilder>{
    TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
    TargetPlatform.linux: NoAnimationPageTransitionsBuilder(),
    TargetPlatform.macOS: NoAnimationPageTransitionsBuilder(),
    TargetPlatform.windows: NoAnimationPageTransitionsBuilder(),
  },
);

final lightThemeData = ThemeData(
  pageTransitionsTheme: pageTransitionsTheme,
  // This is the theme of your application.
  //
  // TRY THIS: Try running your application with "flutter run". You'll see
  // the application has a purple toolbar. Then, without quitting the app,
  // try changing the seedColor in the colorScheme below to Colors.green
  // and then invoke "hot reload" (save your changes or press the "hot
  // reload" button in a Flutter-supported IDE, or press "r" if you used
  // the command line to start the app).
  //
  // Notice that the counter didn't reset back to zero; the application
  // state is not lost during the reload. To reset the state, use hot
  // restart instead.
  //
  // This works for code too, not just values: Most code changes can be
  // tested with just a hot reload.
  // brightness: Brightness.light,
  colorScheme: ColorScheme.fromSeed(seedColor: flusterBlue),
  primaryColor: flusterBlue,
  primaryColorDark: flusterBlue,
  // NOTE: When creating the rest of the shadCN based theme extensions, only add one at a time to each light and dark theme, and swap the entire theme based on a user's configuration and settings.
  extensions: <ThemeExtension<dynamic>>[
      flusterThemeExtensionLight(),
// const ShadTheme(backgroundColor: Color.)
  ]
);

final darkThemeData = ThemeData(
  scaffoldBackgroundColor: Color(0xFF15131C),
  colorScheme: ColorScheme.dark(primary: flusterBlue),
  primaryColor: flusterBlue,
  primaryColorDark: flusterBlue,
  brightness: Brightness.dark,
  dividerColor: flusterBlue,
    // textTheme: TextTheme,
  extensions: <ThemeExtension<dynamic>>[
      flusterThemeExtensionDark(),
// const ShadTheme(backgroundColor: Color.)
  ]
  /* dark theme settings */
);
