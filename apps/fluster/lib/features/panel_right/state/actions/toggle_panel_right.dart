import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_resize_group.dart';

class TogglePanelRightAction extends FlusterAction {
  TogglePanelRightAction();

  @override
  GlobalAppState reduce() {
    final newState = state.uiState.panelRightState.withToggle();
    globalPanelRightOpen.value = newState.open;
    return state.copyWith(
      uiState: state.uiState.copyWith(panelRightState: newState),
    );
  }
}
