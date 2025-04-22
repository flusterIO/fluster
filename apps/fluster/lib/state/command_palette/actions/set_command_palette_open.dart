import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';

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
