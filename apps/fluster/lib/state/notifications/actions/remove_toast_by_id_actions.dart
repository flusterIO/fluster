
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';

class RemoveToastByIdAction extends FlusterAction {
    final String id;
    RemoveToastByIdAction(this.id);

  @override
  GlobalAppState reduce() {
     return state.copyWith(notificationState: state.notificationState.withRemoveToastById(id));
  }
}

