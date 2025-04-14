import 'package:fluster/state/providers/notifications/notification_item.dart';
import 'package:fluster/state/providers/notifications/notifications_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<NotificationsState> notificationsProvider =
    StateProvider<NotificationsState>(
      (Ref<NotificationsState> ref) =>
          NotificationsState(items: <NotificationItem>[]),
    );
