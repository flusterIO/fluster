import 'package:fluster/data_models/actions/global_action.dart';
import 'package:fluster/data_models/actions/global_action_ids.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster/state/ui/panels/panel_right/actions/panel_right_actions.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';


GlobalAction getToggleRightPanelAction() {
  return GlobalAction(
    globalActionId: GlobalActionId.toggleRightPanel,
    activator: LogicalKeySet(LogicalKeyboardKey.meta, LogicalKeyboardKey.keyR),
  );
}
