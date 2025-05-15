import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

final openCommandPaletteAction = GlobalAction(
  globalActionId: GlobalActionId.commandPaletteOpen,
  activator: SingleActivator(LogicalKeyboardKey.keyP, meta: true),
);
