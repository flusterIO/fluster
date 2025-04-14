import 'package:fluster/state/providers/notifications/notifications_provider.dart';
import 'package:fluster/static/constants/static_constants.dart';
import 'package:fluster/widgets/layout/notifications/desktop_notification_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluster/state/providers/notifications/notification_item.dart';

final notificationsListKey = GlobalKey<AnimatedListState>();

// RESUME: Come back and fix this. Currently, removing items and then adding more items fails for some reason. Also, the animations don't you know... animate shit.
class NotificationsContainerDesktop extends ConsumerWidget {
  const NotificationsContainerDesktop({super.key});

  Widget buildItem(
    NotificationItem item,
    Animation<double> anim,
    int idx,
    WidgetRef ref,

    /// true if animation should be an exit animation.
    bool? isRemoval,
  ) {
    return DesktopNotification(
      item: item,
      anim: anim,
      idx: idx,
      removeSelf: () => removeItem(idx, ref),
      exiting: isRemoval,
    );
  }

  void removeItem(int idx, WidgetRef ref) {
    notificationsListKey.currentState?.removeItem(idx, (context, anim) {
      anim.addStatusListener((status) {
        if (status == AnimationStatus.dismissed) {
          final data = ref.read(notificationsProvider.notifier);
          data.state.items.removeAt(idx);
          data.state = data.state.copyWith(items: data.state.items);
        }
      });
      return buildItem(
        ref.read(notificationsProvider).items[idx],
        anim,
        idx,
        ref,
        true,
      );
    });
  }

  void appendItem(WidgetRef ref, NotificationItem item) {
    final data = ref.read(notificationsProvider.notifier);
    data.state = data.state.copyWith(items: [...data.state.items, item]);
    notificationsListKey.currentState?.insertItem(data.state.items.length);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notifications = ref.watch(notificationsProvider);
    final rect = MediaQuery.of(context).size;
    // TODO: Add sort function here that takes an optional sort index for each NotificationItem class. This should allow the syncing indicator to remain on top, while grouping notifications similar to the way iOS does it through the category field.
    return Positioned(
      top: 4,
      right: 16,
      width: rect.width < 300 ? rect.width : 300,
      height: rect.height - appBarHeightOffset,
      child: AnimatedList(
        key: notificationsListKey,
        initialItemCount: notifications.items.length,
        shrinkWrap: true,
        clipBehavior: Clip.antiAlias,
        physics: BouncingScrollPhysics(),
        itemBuilder: (
          BuildContext context,
          int idx,
          Animation<double> animation,
        ) {
          return buildItem(
            notifications.items[idx],
            animation,
            idx,
            ref,
            false,
          );
        },
      ),
    );
  }
}
