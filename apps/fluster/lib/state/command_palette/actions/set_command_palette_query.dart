
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';

class SetCommandPaletteQueryAction extends FlusterAction {
    final String query;
SetCommandPaletteQueryAction(this.query);

  @override
  GlobalAppState reduce() {
        return state.copyWith(
            commandPaletteState: state.commandPaletteState.copyWith(
                query: query
            )
        );
  }
}
