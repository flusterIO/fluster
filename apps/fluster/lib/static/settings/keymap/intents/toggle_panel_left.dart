import 'package:fluster/state/providers/panelLeft/panel_left_provider.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TogglePanelLeftIntent extends Intent {}

class TogglePanelLeftAction extends Action<TogglePanelLeftIntent> {
  final WidgetRef ref;
  TogglePanelLeftAction(this.ref);
  @override
  void invoke(covariant TogglePanelLeftIntent intent) {
    final currentState = ref.read(panelLeftProvider);
    ref.read(panelLeftProvider.notifier).state = currentState.copyWith(
      open: !currentState.open,
    );
  }
}
