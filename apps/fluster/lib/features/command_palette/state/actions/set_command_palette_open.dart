import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

class SetCommandPaletteOpenAction extends FlusterAction {
  final bool open;
  SetCommandPaletteOpenAction(this.open);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(open: open),
    );
  }
}
