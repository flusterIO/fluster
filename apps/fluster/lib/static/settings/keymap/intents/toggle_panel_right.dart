import 'package:fluster/state/providers/panelRight/panel_right_provider.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';


class TogglePanelRightIntent extends Intent {}

class TogglePanelRightAction extends Action<TogglePanelRightIntent> {
    final WidgetRef ref;
    TogglePanelRightAction(this.ref);
    @override
      void invoke(covariant TogglePanelRightIntent intent) {
         final currentState = ref.read(panelRightProvider);
        ref.read(panelRightProvider.notifier).state = currentState.copyWith(open: !currentState.open);
      }
}


