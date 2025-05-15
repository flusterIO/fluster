import 'package:fluster/features/panel_left/presentation/widgets/desktop_panel_left.dart';
import 'package:fluster/features/panel_right/presentation/widgets/desktop_panel_right.dart';
import 'package:flutter/material.dart';
import 'package:flutter_resizable_container/flutter_resizable_container.dart';

final globalPanelLeftOpen = ValueNotifier(true);
final globalPanelRightOpen = ValueNotifier(true);

class DesktopResizeGroup extends StatelessWidget {
  final Widget child;
  const DesktopResizeGroup({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: globalPanelRightOpen,
      builder: (
        BuildContext panelRightContext,
        bool panelRightOpen,
        Widget? panelRightChild,
      ) {
        return ValueListenableBuilder(
          valueListenable: globalPanelLeftOpen,
          builder: (
            BuildContext panelLeftContext,
            bool panelLeftOpen,
            Widget? panelLeftChild,
          ) {
            final children = <ResizableChild>[];
            if (panelLeftOpen) {
              children.add(
                ResizableChild(
                  // divider: ResizableDivider(thickness: 2),
                  size: ResizableSize.shrink(),
                  child: DesktopPanelLeftSwitch(),
                  // minSize: 120,
                ),
              );
            }

            children.add(
              ResizableChild(
                // divider: ResizableDivider(thickness: 2),
                size: const ResizableSize.expand(flex: 6),
                child: child,
              ),
            );

            if (globalPanelRightOpen.value) {
              children.add(
                ResizableChild(
                  // divider: ResizableDivider(thickness: 2),
                  size: ResizableSize.expand(flex: 3),
                  child: DesktopPanelRight(),
                ),
              );
            }

            return ResizableContainer(
              children: children,
              direction: Axis.horizontal,
            );
          },
        );
      },
    );
  }
}
