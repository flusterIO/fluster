
import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

final selectItemDownGlobalAction = GlobalAction(
    globalActionId: GlobalActionId.selectItemDown,
    activator: LogicalKeySet(LogicalKeyboardKey.alt, LogicalKeyboardKey.keyJ),
  );


final selectItemUpGlobalAction = GlobalAction(
    globalActionId: GlobalActionId.selectItemUp,
    activator: LogicalKeySet(LogicalKeyboardKey.alt, LogicalKeyboardKey.keyK),
  );

final selectItemRightGlobalAction = GlobalAction(
    globalActionId: GlobalActionId.selectItemRight,
    activator: LogicalKeySet(LogicalKeyboardKey.alt, LogicalKeyboardKey.keyH),
  );

final selectItemLeftGlobalAction = GlobalAction(
    globalActionId: GlobalActionId.selectItemLeft,
    activator: LogicalKeySet(LogicalKeyboardKey.alt, LogicalKeyboardKey.keyL),
  );
