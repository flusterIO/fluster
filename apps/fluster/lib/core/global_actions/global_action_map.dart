import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/state/nested_state/layout_state/panels/panel_left/actions/panel_left_actions.dart';
import 'package:fluster/core/state/nested_state/layout_state/panels/panel_right/actions/panel_right_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/presentation/state/actions/set_command_palette_back.dart';
import 'package:fluster/features/command_palette/presentation/state/actions/set_command_palette_open.dart';

void callGlobalAction(GlobalActionId id) {
  switch (id) {
    case GlobalActionId.toggleLeftPanel:
      globalReduxStore.dispatch(TogglePanelLeftAction());
      break;
    case GlobalActionId.toggleRightPanel:
      globalReduxStore.dispatch(TogglePanelRightAction());
      break;
    case GlobalActionId.commandPaletteOpen:
      globalReduxStore.dispatch(SetCommandPaletteOpenAction(true));
      break;
    case GlobalActionId.commandPaletteBack:
      globalReduxStore.dispatch(CommandPaletteBackAction());
      break;
  }
}
