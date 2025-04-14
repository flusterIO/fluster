import 'package:fluster/widgets/screens/settings/widgets/section_label.dart';
import 'package:flutter/material.dart';

class SettingSection extends StatelessWidget {
  final String label;
  final List<Widget> children;
  const SettingSection({
    super.key,
    required this.label,
    required this.children,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 24,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [SettingsSectionLabel(content: label), ...children],
    );
  }
}
