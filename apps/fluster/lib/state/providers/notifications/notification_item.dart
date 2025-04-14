import 'package:fluent_ui/fluent_ui.dart';
import 'package:fluster/types/ui_types.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:uuid/uuid.dart';

part "notification_item.freezed.dart";

enum NotificationCategory {
  syncDirectory("syncdir"),
  p2pMessage("p2pMessage");

  const NotificationCategory(this.cat);
  final String cat;

  // @override
  // bool compareTo(NotificationCategory other) => cat == other.cat;
}

class NotificationId {
  final String id;
  const NotificationId(this.id);

  static NotificationId init() {
    final uid = Uuid();
    return NotificationId(uid.v8());
  }

  static NotificationId fromNotificationCategory(
    NotificationCategory category,
  ) {
    final uid = Uuid();
    return NotificationId("${uid.v8()}-cat${category}");
  }
}

@freezed
class NotificationItem with _$NotificationItem {
  const factory NotificationItem({
    required String title,
    required String body,
    required NotificationId id,
    Duration? duration,
    IconData? icon,
    IconWidgetFunction? iconFunction,
  }) = _NotificationItem;
}
