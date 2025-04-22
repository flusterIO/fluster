import 'package:fluster/data_models/actions/global_action.dart';
import 'package:fluster/data_models/actions/global_action_ids.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';


GlobalAction getCommandPaletteBackAction() {
  return GlobalAction(
    globalActionId: GlobalActionId.commandPaletteBack,
    activator: LogicalKeySet(LogicalKeyboardKey.alt, LogicalKeyboardKey.keyO),
  );
}
