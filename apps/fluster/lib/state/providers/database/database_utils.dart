import 'package:fluster/state/providers/database/database_provider.dart';
import 'package:fluster/state/providers/notifications/notification_item.dart';
import 'package:fluster/state/providers/notifications/notifications_provider.dart';
import 'package:fluster/widgets/layout/notifications/desktop_notification.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void showLoadingNotification() {}

void hideLoadingNotification() {}

void setDatabaseSyncingState(WidgetRef ref, bool isSyncing) {
  final currentDbState = ref.read(databaseProvider);
  ref.read(databaseProvider.notifier).state = currentDbState.copyWith(
    syncing: isSyncing,
  );
}

void setLoadingState(WidgetRef ref, bool isLoading) {
  final notificationState = ref.read(notificationsProvider);
  if (isLoading) {
    final loadingNotification = NotificationItem(
      id: NotificationId.fromNotificationCategory(
        NotificationCategory.syncDirectory,
      ),
      title: "Syncing",
      body:
          "Reading your notes directory and populating your database accordingly...",
      iconFunction: (BuildContext context) {
        return Icon(Icons.abc);
      },
    );
    ref.read(notificationsProvider.notifier).state = notificationState.copyWith(
      items: [loadingNotification, ...notificationState.items],
    );
    notificationsListKey.currentState?.insertItem(
      notificationState.items.length,
    );
  } else {
    print("here");
  }
}
