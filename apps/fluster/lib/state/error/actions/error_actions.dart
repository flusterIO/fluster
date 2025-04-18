import 'dart:async';

import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';
import 'package:fluster/widgets/scaffolds/desktop/error_page.dart';

class EmitFlusterErrorAction extends FlusterAction {
    final FlusterError error;
    EmitFlusterErrorAction(this.error);

  @override
  FutureOr<GlobalAppState?> reduce() {
        return state.copyWith(errorState: state.errorState.withAppendedError(error));
  }

}
