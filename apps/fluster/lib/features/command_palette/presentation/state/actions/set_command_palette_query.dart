

import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

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
