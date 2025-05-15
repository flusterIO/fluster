

import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

class RemoveToastByIdAction extends FlusterAction {
    final String id;
    RemoveToastByIdAction(this.id);

  @override
  GlobalAppState reduce() {
     return state.copyWith(notificationState: state.notificationState.withRemoveToastById(id));
  }
}

