import 'package:fluster/core/static/constants/static_constants.dart';
import 'package:fluster/features/onboarding/data/models/onboarding_step.dart';
import 'package:flutter/material.dart';

class SideStepItem extends StatelessWidget {
  final OnboardingStep item;
  const SideStepItem({super.key, required this.item});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(color: theme.cardColor),
      child: Padding(
        padding: EdgeInsets.all(32),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                item.label,
                style: theme.textTheme.titleLarge?.copyWith(fontSize: 32),
              ),
              Text(
                item.desc,
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.textTheme.bodyLarge?.color?.withValues(
                    alpha: 0.6,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
