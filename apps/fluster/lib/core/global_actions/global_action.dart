import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class GlobalAction<T extends Intent> extends Action<T> {
  final String _splitter = "-";
  final GlobalActionId globalActionId;
  SingleActivator? activator;
  GlobalAction({required this.globalActionId, this.activator});

  @override
  String toString({DiagnosticLevel? minLevel}) {
    assert(
      activator != null,
      "Tried to call toFormattedString on a GlobalAction without an activator",
    );

    if (activator == null) {
      return "";
    }

    return [
      activator!.trigger.keyId.toString(),
      activator!.shift ? "true" : "false",
      activator!.alt ? "true" : "false",
      activator!.meta ? "true" : "false",
      activator!.control ? "true" : "false",
    ].join(_splitter);
  }

  static GlobalAction fromFormattedEntry({
    required GlobalActionId id,
    required String value,
  }) {
    final x = GlobalAction(globalActionId: id);
    x.applyActivatorString(value);
    return x;
  }

  @override
  Object? invoke(T intent) {
    final f = globalActionMap[globalActionId];
    if (f != null) {
      f();
    } else {
      throw FormatException(
        "Attempted to call an action $globalActionId that is not available in the globalActionMap.",
      );
    }
    return null;
  }

  applyActivatorString(String activatorString) {
    final split = activatorString.split(_splitter);
    activator = SingleActivator(
      LogicalKeyboardKey(int.parse(split[0])),
      shift: split[1] == "true",
      alt: split[2] == "true",
      meta: split[3] == "true",
      control: split[4] == "true",
    );
  }
}
