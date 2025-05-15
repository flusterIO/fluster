
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/notifications/data/models/toast.dart';

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
