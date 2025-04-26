import 'dart:async';
import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/core/static/global_keys.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/command_palette_root.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/navigation/business/entities/router/router.dart';
import 'package:fluster/features/panel_left/state/actions/toggle_panel_left.dart';
import 'package:fluster/features/panel_right/state/actions/toggle_panel_right.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:fluster/features/settings/data/setting_by_category/syncing/syncing_settings.dart';
import 'package:flutter/material.dart';
import "package:fluster_native_interface/fluster_native_interface.dart"
    as native;

void showCommandPalette() {
  if (commandPaletteGlobalKey.currentContext != null) {
    return;
  }
  showDialog(
    context: parentRouterKey.currentContext!,
    builder: (_) => CommandPaletteWidget(),
    barrierDismissible: false,
  );

  // globalReduxStore.dispatch(
  //   SetCommandPaletteOpenAction(true, initialCategory: CommandPaletteRoot()),
  // );
}

void closeCommandPalette() {
  if (commandPaletteGlobalKey.currentContext == null) {
    return;
  }
  // globalReduxStore.dispatch(
  //   SetCommandPaletteOpenAction(false, initialCategory: null),
  // );
  Navigator.of(parentRouterKey.currentContext!).pop();
}

final globalActionMap = <GlobalActionId, FutureOr<void> Function()>{
  GlobalActionId.toggleLeftPanel: () =>
      globalReduxStore.dispatch(TogglePanelLeftAction()),
  GlobalActionId.toggleRightPanel: () =>
      globalReduxStore.dispatch(TogglePanelRightAction()),
  GlobalActionId.commandPaletteOpen: () {
    globalReduxStore.dispatch(
      SetCommandPaletteOpenAction(true, initialCategory: CommandPaletteRoot()),
    );
    showCommandPalette();
  },
  GlobalActionId.syncDirectoryWithDatabase: () {
    final val = globalReduxStore
        .state
        .settingsState
        .settings
        .pages[SettingPageId.syncingAndDatabase]
        ?.sections[SyncingAndDatabaseSettingSectionId.directorySettings]
        ?.items[SettingUniqueKey.notesDirectoryRootPath];
    final finalValue = val?.value ?? val?.defaultValue;
    // if(finalValue){
    // // TEMP: Show a dialog here that the directory can't sync until the user sets their directory path.
    // }
    // native.syncDirectory(dirPath: );
    native.syncDirectory(dirName: finalValue);
  },
};
