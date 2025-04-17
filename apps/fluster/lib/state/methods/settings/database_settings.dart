import 'dart:async';

import 'package:fluster/static/settings/settings_root.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'database_settings.g.dart';

class Singleton {
  static final Singleton _singleton = Singleton._internal();
  Settings settings = getInitialSettings();

  factory Singleton() {
    return _singleton;
  }

  Singleton._internal();
}

// Settings Function()

@riverpod
Future<Settings> databaseSettings(Ref currentSettings) async {
  // if (!currentSettings.isSeeded) {
  //   final newSettings = await currentSettings.toSeeded();
  //   Singleton().settings = newSettings;
  //   return newSettings;
  // }
  // // Singleton().settings = currentSettings;
  // return currentSettings;
  // } else {
  //     new
  // }
  // var km = Map();
  // var state = ref.watch(settingsProvider.notifier);
  final timer = Timer(Duration(seconds: 10), () => {});
  timer.cancel();

  // FIX: Get keymap settings from the database here, apply them to the km, and apply the copyWith field and push the updated state to the provider.
  return Singleton().settings;
}
