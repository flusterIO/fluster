import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/desktop_resize_group.dart';

class TogglePanelLeftAction extends FlusterAction {
  TogglePanelLeftAction();

  @override
  GlobalAppState reduce() {
    final newState = state.uiState.panelLeftState.withToggle();
    globalPanelLeftOpen.value = newState.open;
    return state.copyWith(
      uiState: state.uiState.copyWith(panelLeftState: newState),
    );
  }
}
