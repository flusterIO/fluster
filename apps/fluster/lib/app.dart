// Copyright 2021, the Flutter project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:fluster/router/router.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/static/styles/themes/themes.dart';
import 'package:fluster/widgets/scaffolds/desktop/loading_indicator.dart';
import 'package:flutter/material.dart';

class FlusterDesktopApp extends StatelessWidget {
  const FlusterDesktopApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: "Fluster",
      theme: lightThemeData,
      darkTheme: darkThemeData,
      highContrastDarkTheme: darkThemeData,
      themeMode: context.state.uiState.themeMode,
      debugShowCheckedModeBanner: false,
      // FLUTTER_MULTI_PLATFORM_WARNING: This will need to be adjusted for non-desktop environments.
      scrollBehavior: const MaterialScrollBehavior().copyWith(
        scrollbars: false,
      ),
      // shortcuts:
      //     (ref.context.sgetPageById(SettingPageId.keymap)
      //             as KeymapSettingPageData)
      //         .toAppScaffoldShortcuts(),
      // actions:
      //     (settings.getPageById(SettingPageId.keymap)
      //             as KeymapSettingPageData)
      //         .toAppScaffoldActions(),
      builder:
          (_, child) => MediaQuery(
            data: MediaQuery.of(context).copyWith(
              textScaler: MediaQuery.of(
                context,
              ).textScaler.clamp(minScaleFactor: 0.6, maxScaleFactor: 0.9),
            ),
            child:
                context.state.networkState.loading
                    ? DesktopLoadingWidgetIndicator()
                    : child!,
          ),
      routerConfig: router,
    );
  }
}
