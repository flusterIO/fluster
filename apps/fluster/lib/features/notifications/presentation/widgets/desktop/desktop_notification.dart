import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/core/static/constants/static_constants.dart';
import 'package:fluster/features/notifications/data/models/toast.dart';
import 'package:fluster/features/notifications/presentation/state/actions/append_toast.dart';
import 'package:fluster/features/notifications/presentation/state/actions/remove_toast_by_id_actions.dart';
import 'package:fluster/features/notifications/presentation/widgets/desktop/desktop_notification_list.dart';
import 'package:flutter/material.dart';

final notificationsListKey = GlobalKey<AnimatedListState>();

// FIXME: Come back and fix this. Currently, removing items and then adding more items fails for some reason. Also, the animations don't you know... animate shit.
class NotificationsContainerDesktop extends StatelessWidget {
  const NotificationsContainerDesktop({super.key});

  Widget buildItem(
    ToastNotificationItem item,
    Animation<double> anim,
    int idx,

    /// true if animation should be an exit animation.
    bool? isRemoval,
  ) {
    return DesktopNotification(
      item: item,
      anim: anim,
      idx: idx,
      removeSelf: () => removeItem(idx),
      exiting: isRemoval,
    );
  }

  void removeItem(int idx) {
    notificationsListKey.currentState?.removeItem(idx, (context, anim) {
      anim.addStatusListener((status) {
        if (status == AnimationStatus.dismissed) {
          globalReduxStore.dispatch(
            RemoveToastByIdAction(
              globalReduxStore.state.notificationState.toasts[idx].id,
            ),
          );
        }
      });
      return buildItem(
        globalReduxStore.state.notificationState.toasts[idx],
        anim,
        idx,
        true,
      );
    });
  }

  void appendItem(ToastNotificationItem item) {
    globalReduxStore.dispatch(AppendToastNotificationAction(item));
  }

  @override
  Widget build(BuildContext context) {
    final rect = MediaQuery.of(context).size;
    return Positioned(
      top: 4,
      right: 16,
      width: rect.width < 300 ? rect.width : 300,
      height: rect.height - appBarHeightOffset,
      child: AnimatedList(
        key: notificationsListKey,
        initialItemCount: context.state.notificationState.toasts.length,
        shrinkWrap: true,
        clipBehavior: Clip.antiAlias,
        physics: BouncingScrollPhysics(),
        itemBuilder: (
          BuildContext context,
          int idx,
          Animation<double> animation,
        ) {
          return buildItem(
            context.state.notificationState.toasts[idx],
            animation,
            idx,
            false,
          );
        },
      ),
    );
  }
}
