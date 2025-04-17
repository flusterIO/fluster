import 'package:fluster/widgets/screens/settings/widgets/section_label.dart';
import 'package:flutter/material.dart';

class SettingSection extends StatelessWidget {
  final String? label;
  final String? subtitle;
  final List<Widget> children;
  const SettingSection({
    super.key,
    required this.label,
    required this.subtitle,
    required this.children,
  });
  @override
  Widget build(BuildContext context) {
    var items = <Widget>[];
    if (label != null && label != "") {
      items.add(SettingsSectionLabel(content: label!));
      if (subtitle != null && subtitle != "") {
        items.add(SettingsSectionLabel(content: label!, subtitle: true,));
      }
    }
    items.addAll(children);
    return Column(
      spacing: 0,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: items,
    );
  }
}
