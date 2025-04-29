import 'dart:async';

import 'package:async_redux/async_redux.dart';
import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';

class CommandPaletteGlobalActionCommand extends CommandPaletteEntry {
  final GlobalActionId actionId;
  const CommandPaletteGlobalActionCommand({
    required super.label,
    required super.category,
    required super.items,
    required super.desc,
    required this.actionId,
  });
  @override
  void callAction(context) async {
    final f = globalActionMap[actionId];
    context.dispatch(SetCommandPaletteOpenAction(false, initialCategory: null));
    if (f != null) {
      await f(context);
    }

  }
}
