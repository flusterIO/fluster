import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';


final toggleRightGlobalPanelAction = GlobalAction(
    globalActionId: GlobalActionId.toggleRightPanel,
    activator: LogicalKeySet(LogicalKeyboardKey.meta, LogicalKeyboardKey.keyR),
  );
