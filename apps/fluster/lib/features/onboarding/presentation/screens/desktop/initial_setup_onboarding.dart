import 'package:fluster/features/onboarding/presentation/screens/desktop/layout/side_steps.dart';
import 'package:flutter/material.dart';

final initialOnboardingScaffoldKey = GlobalKey<ScaffoldState>(
  debugLabel: "initialOnboardingScaffoldKey",
);

class InitialOnboardingDesktopScreen extends StatelessWidget {
  final Widget child;
  const InitialOnboardingDesktopScreen({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    // initialOnboardingScaffoldKey.currentState?.openEndDrawer();
    return Scaffold(
      key: initialOnboardingScaffoldKey,
      primary: false,
      extendBody: true,
      restorationId: "onboarding-scaffold",
      body: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Expanded(child: child),
          const FlutterOnboardingSteps(),
        ],
      ),

      endDrawerEnableOpenDragGesture: false,
    );
  }
}
