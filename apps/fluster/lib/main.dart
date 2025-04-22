// Copyright 2021, the Flutter project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:fluster/app.dart';
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/widgets/wrappers/keyboard_shortcut_wrapper.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart';
import 'package:flutter/material.dart';
import 'package:async_redux/async_redux.dart';
import 'package:fluster/state/store.dart';
// import 'package:ulld_native/static/styles/theme_notifier.dart';

/// This method initializes macos_window_utils and styles the window.
// Future<void> _configureMacosWindowUtils() async {
//   // const config = MacosWindowUtilsConfigj(
//   //   toolbarStyle: NSWindowToolbarStyle.unified,
//   // );
//   // await config.apply();
// }

void main() async {
  // await _configureMacosWindowUtils();

  await RustLib.init();
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    // For widgets to be able to read providers, we need to wrap the entire
    // application in a "ProviderScope" widget.
    // This is where the state of our providers will be stored.
    StoreProvider<GlobalAppState>(
      store: globalReduxStore,
      // observers: <ProviderObserver>[StateLogger()],
      child: DesktopKeyboardShortcuts(child: FlusterDesktopApp()),
    ),
  );
  doWhenWindowReady(() {
    // const initialSize = Size(1200, 800);
    // appWindow.minSize = initialSize;
    // appWindow.size = initialSize;
    // appWindow.alignment = Alignment.center;
    appWindow.title = "Fluster";
    appWindow.maximize();
    appWindow.show();
  });
}
