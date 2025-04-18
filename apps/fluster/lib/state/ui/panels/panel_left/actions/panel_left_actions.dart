import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';

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
