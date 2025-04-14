import 'package:fluster/state/providers/notifications/notification_item.dart';
import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "notifications_state.freezed.dart";

typedef NotificationEventHandler =
    void Function(NotificationItem item, int index);

const testId = NotificationId("some-random-id");

const testItem = NotificationItem(
  title: "title",
  body:
      "Amet eleifend, non, quam platea condimentum ipsum maximus ex ultricies. Praesent eleifend donec, est nullam elementum vel proin, efficitur euismod.",
  duration: Duration(minutes: 1),
  icon: Icons.timer,
  id: testId,
);

@freezed
class NotificationsState with _$NotificationsState {
  // This private constructor is required for jkkq
  const NotificationsState._();

  const factory NotificationsState({
    @Default(<NotificationItem>[testItem]) List<NotificationItem> items,
  }) = _NotificationsState;

  List<NotificationItem> removeItemById({
    required NotificationId id,
    NotificationEventHandler? onRemove,
  }) {
    final items = <NotificationItem>[];
    for (var i = 0; i < this.items.length; i++) {
      final item = this.items[i];
      if (item.id.id != id.id) {
        items.add(item);
      } else if (onRemove != null) {
        onRemove(item, i);
      }
    }
    return items;
  }

  newWithAppendedItem(NotificationItem item) {
    return copyWith(items: [...items, item]);
  }
}
