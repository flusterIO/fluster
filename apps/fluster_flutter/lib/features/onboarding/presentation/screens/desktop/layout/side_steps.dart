import 'dart:math';

import 'package:fluster/features/onboarding/data/onboarding_steps.dart';
import 'package:fluster/features/onboarding/presentation/screens/desktop/layout/side_step_item.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class FlutterOnboardingSteps extends StatelessWidget {
  const FlutterOnboardingSteps({super.key});
  @override
  Widget build(BuildContext context) {
    final currentUrl = GoRouter.of(context).routeInformationProvider.value.uri.toString();
    final size = MediaQuery.sizeOf(context);
    final theme = Theme.of(context);
    final route = onboardingSteps.singleWhere((x) => x.href == currentUrl);
    return Container(
      decoration: BoxDecoration(color: theme.dividerColor),
      child: SizedBox.fromSize(
        size: Size(min(size.width * 0.3, 400), size.height),
        child: SideStepItem(item: route,)
      ),
    );
  }
}
