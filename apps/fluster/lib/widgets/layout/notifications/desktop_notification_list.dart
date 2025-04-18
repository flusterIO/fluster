import 'dart:async';
import 'package:fluster/data_models/notifications/toast.dart';
import 'package:fluster/state/notifications/actions/remove_toast_by_id_actions.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';

class DesktopNotification extends StatelessWidget {
  final ToastNotificationItem item;
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

  void setRemoveTimer() {
    if (item.duration == null) {
      return;
    }
    var timer = Timer(item.duration!, () {
      globalReduxStore.dispatch(RemoveToastByIdAction(item.id));
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
  Widget build(BuildContext context) {
    setRemoveTimer();

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
