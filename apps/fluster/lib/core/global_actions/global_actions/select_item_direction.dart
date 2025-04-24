import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

final selectItemDownGlobalAction = GlobalAction(
  globalActionId: GlobalActionId.selectItemDown,
  activator: SingleActivator(LogicalKeyboardKey.keyJ, alt: true),
);

final selectItemUpGlobalAction = GlobalAction(
  globalActionId: GlobalActionId.selectItemUp,
  activator: SingleActivator(LogicalKeyboardKey.keyK, alt: true),
);

final selectItemRightGlobalAction = GlobalAction(
  globalActionId: GlobalActionId.selectItemRight,
  activator: SingleActivator(LogicalKeyboardKey.keyH, alt: true),
);

final selectItemLeftGlobalAction = GlobalAction(
  globalActionId: GlobalActionId.selectItemLeft,
  activator: SingleActivator(LogicalKeyboardKey.keyL, alt: true),
);
