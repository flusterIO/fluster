import 'package:fluster/state/providers/panelRight/panel_right_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final StateProvider<PanelRightState> panelRightProvider =
    StateProvider<PanelRightState>(
      (Ref<PanelRightState> ref) => PanelRightState(open: true),
    );
