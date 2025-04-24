import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/command_palette_root.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_back.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/panel_left/state/actions/toggle_panel_left.dart';
import 'package:fluster/features/panel_right/state/actions/toggle_panel_right.dart';


final globalActionMap = <GlobalActionId, void Function()>{ 
    GlobalActionId.toggleLeftPanel: () => globalReduxStore.dispatch(TogglePanelLeftAction()),
    GlobalActionId.toggleRightPanel: () => globalReduxStore.dispatch(TogglePanelRightAction()),
    GlobalActionId.commandPaletteOpen: () => globalReduxStore.dispatch(SetCommandPaletteOpenAction(true, initialCategory: CommandPaletteRoot())),
    GlobalActionId.commandPaletteBack: () => globalReduxStore.dispatch(CommandPaletteBackAction())
};

void callGlobalAction(GlobalActionId id) {
  switch (id) {
    case GlobalActionId.toggleLeftPanel:
      globalReduxStore.dispatch(TogglePanelLeftAction());
      break;
    case GlobalActionId.toggleRightPanel:
      globalReduxStore.dispatch(TogglePanelRightAction());
      break;
    case GlobalActionId.commandPaletteOpen:
      globalReduxStore.dispatch(SetCommandPaletteOpenAction(true, initialCategory: CommandPaletteRoot()));
      break;
    case GlobalActionId.commandPaletteBack:
      globalReduxStore.dispatch(CommandPaletteBackAction());
      break;
  }
}
