import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_left/desktop_panel_left.dart';
import 'package:fluster/widgets/scaffolds/desktop/panel_right/desktop_panel_right.dart';
import 'package:flutter/material.dart';
import 'package:flutter_resizable_container/flutter_resizable_container.dart';

class DesktopResizeGroup extends StatelessWidget {
  final Widget child;
  const DesktopResizeGroup({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    final ShadTheme? theme = Theme.of(context).extension<ShadTheme>();
    final children = <ResizableChild>[];

    if (context.state.uiState.panelLeftState.open) {
      children.add(
        ResizableChild(
          divider: ResizableDivider(color: theme?.border, thickness: 2),
          size: ResizableSize.shrink(min: 160),
          child: DesktopPanelLeftSwitch(),
          // minSize: 120,
        ),
      );
    }

    children.add(
      ResizableChild(
        divider: ResizableDivider(color: theme?.border, thickness: 2),
        size: const ResizableSize.expand(flex: 6),
        child: child,
        // child: Padding(
        //   padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 32),
        //   child: child,
        // ),
      ),
    );

    if (context.state.uiState.panelLeftState.open) {
      children.add(
        ResizableChild(
          divider: ResizableDivider(color: theme?.border, thickness: 2),
          size: ResizableSize.expand(flex: 3),
          child: DesktopPanelRight(),
        ),
      );
    }

    return ResizableContainer(children: children, direction: Axis.horizontal);
  }
}
