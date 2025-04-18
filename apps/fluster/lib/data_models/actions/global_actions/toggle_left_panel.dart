import 'package:fluster/data_models/actions/global_action.dart';
import 'package:fluster/data_models/actions/global_action_ids.dart';
import 'package:fluster/state/store.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:fluster/state/ui/panels/panel_left/actions/panel_left_actions.dart';

class ToggleLeftPanelIntent extends Intent {}

GlobalAction getToggleLeftPanelAction() {
  return GlobalAction(
    globalActionId: GlobalActionId.toggleLeftPanel,
    intent: ToggleLeftPanelIntent,
    activator: LogicalKeySet(LogicalKeyboardKey.meta, LogicalKeyboardKey.keyL),
    callback: () {
      globalReduxStore.dispatch(TogglePanelLeftAction());
      return null;
    },
  );
}
