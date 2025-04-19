import 'dart:async';

import 'package:fluster/data_models/actions/global_action_ids.dart';
import 'package:fluster/data_models/actions/global_actions/toggle_left_panel.dart';

const globalActionIntentMap = {
  GlobalActionId.toggleLeftPanel: ToggleLeftPanelIntent,
};

FutureOr<void> callGlobalAction(GlobalActionId id) {
  switch (id) {
    case GlobalActionId.toggleLeftPanel:
      getToggleLeftPanelAction().invoke(ToggleLeftPanelIntent());
      break;
    default:
  }
}
