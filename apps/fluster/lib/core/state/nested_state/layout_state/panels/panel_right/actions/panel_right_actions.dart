import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

class TogglePanelRightAction extends FlusterAction {
  TogglePanelRightAction();

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      uiState: state.uiState.copyWith(
        panelRightState: state.uiState.panelRightState.withToggle(),
      ),
    );
  }
}
