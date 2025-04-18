import 'package:fluster/data_models/notifications/toast.dart';
import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';

class AppendToastNotificationAction extends FlusterAction {
  final ToastNotificationItem item;
  AppendToastNotificationAction(this.item);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      notificationState: state.notificationState.copyWith(
        toasts: [...state.notificationState.toasts, item],
      ),
    );
  }
}
