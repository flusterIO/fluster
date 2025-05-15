import 'package:flutter/material.dart';

class OnboardingStep {
  final String label;
  final String desc;
  final IconData icon;
  final int idx;
  final String href;
  const OnboardingStep({
    required this.label,
    required this.desc,
    required this.idx,
    required this.icon,
    required this.href,
  });
}
