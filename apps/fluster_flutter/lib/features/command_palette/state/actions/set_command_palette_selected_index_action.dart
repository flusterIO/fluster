import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

class SetCommandPaletteSelectedIndexAction extends FlusterAction {
  final int addToIndex;
  SetCommandPaletteSelectedIndexAction(this.addToIndex);

  @override
  GlobalAppState reduce() {
    if (!state.commandPaletteState.open) {
      return state;
    }
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.withAddedSelectedIndex(
        addToIndex,
      ),
    );
  }
}

class ResetCommandPaletteIndex extends FlusterAction {
  ResetCommandPaletteIndex();

  @override
  GlobalAppState reduce() {
    if (!state.commandPaletteState.open) {
      return state;
    }
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(selectedIndex: 0),
    );
  }
}
