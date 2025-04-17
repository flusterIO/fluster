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
    var colChildren = <Widget>[];
    if (label != null && label != "") {
      colChildren.add(SettingsSectionLabel(content: label!));
      if (subtitle != null && subtitle != "") {
        colChildren.add(SettingsSectionLabel(content: label!, subtitle: true));
      }
    }
    return Column(
      spacing: 24,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children:
          colChildren.isNotEmpty
              ? [
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 0,
                  children: colChildren,
                ),
                Column(
                  spacing: 24,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: children,
                ),
              ]
              : children,
    );
  }
}
