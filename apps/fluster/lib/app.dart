// Copyright 2021, the Flutter project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/features/navigation/business/entities/router/router.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/loading_indicator.dart';
import 'package:fluster/features/settings/state/settings/settings_state.dart';
import 'package:flutter/material.dart';

class FlusterDesktopApp extends StatelessWidget {
  const FlusterDesktopApp({super.key});
  @override
  Widget build(BuildContext context) {
    if (!context.state.settingsState.hasSeeded) {
      SettingsState.readDatabaseAndSeed();
    }

    return MaterialApp.router(
      title: "Fluster",
      theme: FlexThemeData.light(scheme: FlexScheme.flutterDash),
      darkTheme: FlexThemeData.dark(scheme: FlexScheme.flutterDash),
      themeMode: context.state.uiState.themeMode,
      debugShowCheckedModeBanner: false,
      // FLUTTER_MULTI_PLATFORM_WARNING: This will need to be adjusted for non-desktop environments.
      scrollBehavior: const MaterialScrollBehavior().copyWith(
        scrollbars: false,
      ),
      builder: (_, child) => MediaQuery(
        data: MediaQuery.of(context).copyWith(
          textScaler: MediaQuery.of(
            context,
          ).textScaler.clamp(minScaleFactor: 0.6, maxScaleFactor: 0.9),
        ),
        child: context.state.networkState.loading
            ? DesktopLoadingWidgetIndicator()
            : child!,
      ),
      routerConfig: router,
    );
  }
}
