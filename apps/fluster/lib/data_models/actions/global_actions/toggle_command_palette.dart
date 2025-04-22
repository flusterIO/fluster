import 'package:fluster/data_models/actions/global_action.dart';
import 'package:fluster/data_models/actions/global_action_ids.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';


GlobalAction getOpenCommandPaletteAction() {
  return GlobalAction(
    globalActionId: GlobalActionId.commandPaletteOpen,
    activator: LogicalKeySet(LogicalKeyboardKey.meta, LogicalKeyboardKey.keyP),
  );
}
