import 'package:fluster/core/global_actions/global_action_ids.dart';
import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:flutter/material.dart';

class GlobalAction<T extends Intent> extends Action<T> {
  final GlobalActionId globalActionId;
  final ShortcutActivator? activator;
  final String _splitter = "-";
  GlobalAction({required this.globalActionId, this.activator});

  String toFormattedString() {
    var s = <String>[];
    assert(
      activator != null,
      "Tried to call toFormattedString on a GlobalAction without an activator",
    );
    for (var k in activator!.triggers!) {
      s.add("${k.keyId}");
    }
    return s.join(_splitter);
  }

  static GlobalAction fromFormattedEntry({
    required GlobalActionId id,
    required String value,
  }) {
    return GlobalAction(globalActionId: id);
  }

  @override
  Object? invoke(T intent) {
    callGlobalAction(globalActionId);
    return null;
  }
}
