import 'package:flutter/material.dart';

class SettingsSectionLabel extends StatelessWidget {
  final String content;

  /// true if applying subtitle styles
  final bool? subtitle;
  const SettingsSectionLabel({
    super.key,
    required this.content,
    this.subtitle,
  });

  TextStyle? getTextStyle(BuildContext context) {
        final t = Theme.of(context);
    if (subtitle == true) {
      return t.textTheme.titleSmall;
    }
    return t.textTheme.titleLarge?.copyWith(height: 1);
  }

  @override
  Widget build(BuildContext context) {
    return Text(content, style: getTextStyle(context));
  }
}
