// Copyright 2021, the Flutter project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:fluster/core/static/global_keys.dart';
import 'package:fluster/features/navigation/business/entities/router/router.dart';
import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/loading_indicator.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

final globalColorScheme = ValueNotifier(FlexScheme.shadBlue);
final globalThemeMode = ValueNotifier(ThemeMode.system);
final globalCommandPaletteOpen = ValueNotifier(false);

//NOTE: Don't use any state here or it causes massive layout shift.
class FlusterDesktopApp extends StatelessWidget {
  FlusterDesktopApp({
    super.key,
    required this.initialDbStatus,
    // this.colorScheme = FlexScheme.shadBlue,
    // this.themeMode = ThemeMode.system,
  });
  final FlusterDatabaseStatus initialDbStatus;
  final colorScheme = ValueNotifier(FlexScheme.shadBlue);
  final themeMode = ValueNotifier(ThemeMode.system);
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: globalThemeMode,
      builder:
          (BuildContext parentBuildContext, ThemeMode currentThemeMode, child) {
            return ValueListenableBuilder(
              valueListenable: globalColorScheme,
              builder: (BuildContext buildContext, FlexScheme scheme, child) {
                return MaterialApp.router(
                  title: "Fluster",
                  scaffoldMessengerKey: desktopScaffoldMessenegerKey,
                  theme: FlexThemeData.light(scheme: scheme),
                  darkTheme: FlexThemeData.dark(scheme: scheme),
                  themeMode: currentThemeMode,
                  debugShowCheckedModeBanner: false,
                  // FLUTTER_MULTI_PLATFORM_WARNING: This will need to be adjusted for non-desktop environments.
                  scrollBehavior: const MaterialScrollBehavior().copyWith(
                    scrollbars: false,
                  ),
                  builder: (_, child) => MediaQuery(
                    data: MediaQuery.of(context).copyWith(
                      textScaler: MediaQuery.of(context).textScaler.clamp(
                        minScaleFactor: 0.6,
                        maxScaleFactor: 1,
                      ),
                    ),
                    child: child ?? DesktopLoadingWidgetIndicator(),
                  ),
                  // routerConfig: router,
                  routerConfig: appRouter,
                );
              },
            );
          },
    );
  }
}
