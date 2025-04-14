import 'dart:async';
import 'package:fluster/state/providers/notifications/notification_item.dart';
import 'package:fluster/state/providers/notifications/notifications_provider.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class DesktopNotification extends ConsumerWidget {
  final NotificationItem item;
  final Animation<double> anim;
  final int idx;
  final bool? exiting;
  final void Function() removeSelf;
  const DesktopNotification({
    super.key,
    required this.item,
    required this.anim,
    required this.idx,
    required this.removeSelf,
    this.exiting,
  });

  void setRemoveTimer(WidgetRef ref) {
    if (item.duration == null) {
      return;
    }
    var timer = Timer(item.duration!, () {
      final currentState = ref.read(notificationsProvider);
      ref.read(notificationsProvider.notifier).state = currentState.copyWith(
        items: currentState.items.where((x) => x.id != item.id).toList(),
      );
    });
    timer.cancel();
  }

  Widget _getChild(BuildContext context) {
    final theme = Theme.of(context).extension<ShadTheme>()!;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2.0, horizontal: 0),
      child: Container(
        decoration: BoxDecoration(
          color: theme.popover,
          border: Border.all(width: 1, color: theme.border),
          borderRadius: BorderRadius.all(Radius.circular(theme.borderRadius)),
        ),
        child: Stack(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    item.title,
                    style: TextStyle(
                      color: theme.foreground,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  Text(
                    item.body,
                    style: TextStyle(
                      color: theme.mutedForeground,
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              top: 4,
              right: 4,
              child: GestureDetector(
                onTap: () => removeSelf(),
                child: MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: Icon(
                    Icons.close_sharp,
                    color: theme.mutedForeground,
                    size: 12,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    setRemoveTimer(ref);

    final progress = CurvedAnimation(parent: anim, curve: Curves.easeInOut);
    if (exiting == true) {
      return AnimatedBuilder(
        animation: anim,
        builder: (BuildContext context, Widget? child) {
          return Opacity(
            opacity: Tween<double>(begin: 0, end: 1).animate(progress).value,
            child: SizeTransition(
              sizeFactor: anim,
              axis: Axis.vertical,
              // scale: anim,
              child: _getChild(context),
              // sizeFactor: anim,
            ),
          );
        },
      );
      // return Opacity(
      // opacity: Tween<double>(begin: 0, end: 1).animate(progress),
      //   child: SizeTransition(
      //     sizeFactor: anim,
      //     axis: Axis.vertical,
      //     // scale: anim,
      //     child: _getChild(context),
      //     // sizeFactor: anim,
      //   ),
      // );
    }

    return SlideTransition(
      position: anim.drive(
        Tween<Offset>(
          begin: Offset(1, 0),
          end: Offset(0, 0),
        ).chain(CurveTween(curve: Curves.easeInOut)),
      ),
      child: _getChild(context),
      // sizeFactor: anim,
    );
  }
}
