import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

class TogglePanelLeftAction extends FlusterAction {
  TogglePanelLeftAction();

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      uiState: state.uiState.copyWith(
        panelLeftState: state.uiState.panelLeftState.withToggle(),
      ),
    );
  }
}
