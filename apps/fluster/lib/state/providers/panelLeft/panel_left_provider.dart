import 'package:fluster/state/providers/panelLeft/panel_left_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<PanelLeftState> panelLeftProvider =
    StateProvider<PanelLeftState>(
      (Ref<PanelLeftState> ref) => PanelLeftState(open: true),
    );
