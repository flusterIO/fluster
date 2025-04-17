import 'package:fluster/static/settings/keymap/intents/toggle_panel_left.dart';
import 'package:fluster/static/settings/keymap/intents/toggle_panel_right.dart';
import 'package:fluster/static/settings/keymap/keymap_id.dart';
import 'package:fluster/static/settings/keymap/keymap_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ShortcutGroup {
  final ShortcutActivator activator;

  /// Takes an un-intialized Intent class.
  final Type intent;
  final Action action;
  const ShortcutGroup({
    required this.activator,
    required this.intent,
    required this.action,
  });
}

class KeyboardShortcuts extends ConsumerWidget {
  final Widget child;
  const KeyboardShortcuts({super.key, required this.child});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final km = Keymap().keys;
    final Map<ShortcutActivator, Intent> shortcutMap = {
      km[KeymapId.toggleRightPanel]!: TogglePanelRightIntent(),
      km[KeymapId.toggleLeftPanel]!: TogglePanelLeftIntent(),
    };
    final Map<Type, Action> actionMap = {
      TogglePanelRightIntent: TogglePanelRightAction(ref),
      TogglePanelLeftIntent: TogglePanelLeftAction(ref),
    };
    return Shortcuts(
      shortcuts: shortcutMap,
      child: Actions(actions: actionMap, child: child),
    );
  }
}

class KeyboardShortcutGroup {
  final Type action;
  final Type intent;
  const KeyboardShortcutGroup({required this.action, required this.intent});
}

List<KeyboardShortcutGroup> getShortcuts() {
  return [
    KeyboardShortcutGroup(
      action: TogglePanelLeftAction,
      intent: TogglePanelRightIntent,
    ),
  ];
}
