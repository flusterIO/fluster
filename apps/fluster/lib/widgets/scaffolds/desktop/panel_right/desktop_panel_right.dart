import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class DesktopPanelRight extends ConsumerWidget {
  const DesktopPanelRight({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // final sideMenuState = ref.watch(sideMenuProvider);
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
      child: Container(child: Center(child: Text("Panel Right"))),
    );
  }
}
