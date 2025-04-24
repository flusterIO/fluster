import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/features/navigation/business/entities/focus_navigation_group.dart';
import 'package:fluster/features/settings/data/models/keymap_setting_page_data.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class DesktopKeyboardShortcuts extends HookWidget {
  final Widget child;
  const DesktopKeyboardShortcuts({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    final keymapSettings =
        context.state.settingsState.settings.pages[SettingPageId.keymap]
            as KeymapSettingPageData;
    final navGroup = useMemoized(
      () => FocusNavigationGroup.fromKeymapSettings(keymapSettings),
      [keymapSettings],
    );
    final focusNode = useFocusScopeNode();
    return CallbackShortcuts(
      bindings: keymapSettings.toCallbackShortcuts(),
      child: FocusScope(
        descendantsAreFocusable: true,
        node: focusNode,
        onKeyEvent: (node, e) {
          if (navGroup.focusUp?.activator?.accepts(e, HardwareKeyboard()) ??
              false) {
            focusNode.focusInDirection(TraversalDirection.up);
            return KeyEventResult.handled;
          } else if (navGroup.focusDown?.activator?.accepts(
                e,
                HardwareKeyboard(),
              ) ??
              false) {
            focusNode.focusInDirection(TraversalDirection.down);
            return KeyEventResult.handled;
          } else if (navGroup.focusRight?.activator?.accepts(
                e,
                HardwareKeyboard(),
              ) ??
              false) {
            focusNode.focusInDirection(TraversalDirection.right);
            return KeyEventResult.handled;
          } else if (navGroup.focusLeft?.activator?.accepts(
                e,
                HardwareKeyboard(),
              ) ??
              false) {
            focusNode.focusInDirection(TraversalDirection.left);
            return KeyEventResult.handled;
          }
          return KeyEventResult.ignored;
        },
        child: child,
      ),
    );
  }
}
