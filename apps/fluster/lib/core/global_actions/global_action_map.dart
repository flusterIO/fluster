import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/command_palette_root.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/navigation/business/entities/router/router.dart';
import 'package:fluster/features/panel_left/state/actions/toggle_panel_left.dart';
import 'package:fluster/features/panel_right/state/actions/toggle_panel_right.dart';
import 'package:flutter/material.dart';


void showCommandPalette() {  
    // CommandPaletteRoute().push(parentRouterKey.currentContext!);
    showDialog(
        context: parentRouterKey.currentContext!,
        builder: (_) => CommandPaletteWidget(),
        barrierDismissible: false
    );
}


void closeCommandPalette(){
    Navigator.of(parentRouterKey.currentContext!).pop();
}

final globalActionMap = <GlobalActionId, void Function()>{
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
};
