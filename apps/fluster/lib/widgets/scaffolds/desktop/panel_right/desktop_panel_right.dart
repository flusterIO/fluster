import 'package:flutter/material.dart';

class DesktopPanelRight extends StatelessWidget {
  const DesktopPanelRight({super.key});
  @override
  Widget build(BuildContext context) {
    // final sideMenuState = ref.watch(sideMenuProvider);
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
      child: Center(child: Text("Panel Right")),
    );
  }
}
