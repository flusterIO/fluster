import 'package:fluster/data_models/actions/global_action_ids.dart';
import 'package:flutter/material.dart';

class GlobalAction<T extends Intent> extends Action<T> {
  final GlobalActionId globalActionId;
  final ShortcutActivator activator;

  /// intent must be a subclass of Intent. This can't be statically typed in dart, at least not that my 2 weeks of experience leads me to believe, so the `Type` class is used to refer to the type pre-initialization.
  final Type intent;
  final Object? Function() callback;
  GlobalAction({
    required this.globalActionId,
    required this.activator,
    required this.intent,
    required this.callback,
  });

  // String valueToString() {
  //   return "${activator.triggers.join('-')}-${activator.keys.join('-')}";
  // }

  @override
  Object? invoke(T intent) {
    return callback();
  }
}
