// Copyright 2021, the Flutter project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/router/router.dart';
import 'package:fluster/state/methods/settings/database_settings.dart';
import 'package:fluster/state/providers/theme/theme_provider.dart';
import 'package:fluster/static/settings/settings_root.dart';
import 'package:fluster/static/styles/themes/themes.dart';
import 'package:fluster/widgets/scaffolds/desktop/error_page.dart';
import 'package:fluster/widgets/scaffolds/desktop/loading_indicator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// final booksNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'books shell');

// class NoTransitionRoute extends GoRoute {
//   const NoTransitionRoute({builder, super.path });

//   @override
//   Duration get transitionDuration => const Duration(milliseconds: 0);
// }

class FlusterDesktopApp extends ConsumerWidget {
  const FlusterDesktopApp({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    final router = ref.watch(routerProvider);
    final settingsFuture = ref.watch(databaseSettingsProvider);
    return switch (settingsFuture) {
      AsyncData<Settings>(value:final settings) => MaterialApp.router(
        title: "Fluster",
        theme: lightThemeData,
        darkTheme: darkThemeData,
        highContrastDarkTheme: darkThemeData,
        themeMode: themeMode,
        debugShowCheckedModeBanner: false,
        // FLUTTER_MULTI_PLATFORM_WARNING: This will need to be adjusted for non-desktop environments.
        scrollBehavior: const MaterialScrollBehavior().copyWith(
          scrollbars: false,
        ),
        shortcuts:
            (settings.getPageById(SettingPageId.keymap)
                    as KeymapSettingPageData)
                .toAppScaffoldProp(),
        builder:
            (_, child) => MediaQuery(
              data: MediaQuery.of(context).copyWith(
                textScaler: MediaQuery.of(
                  context,
                ).textScaler.clamp(minScaleFactor: 0.6, maxScaleFactor: 0.9),
              ),
              child: child!,
            ),
        routerConfig: router,
      ),
      AsyncError<Settings>() => DesktopErrorPage(
        error: FlusterError(
          cause: "Failed to load database settings.",
          trace: StackTrace.current,
        ),
      ),
      _ => const DesktopLoadingWidgetIndicator(),
    };
  }
}
