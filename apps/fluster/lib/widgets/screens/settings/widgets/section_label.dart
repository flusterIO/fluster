import 'package:flutter/material.dart';

class SettingsSectionLabel extends StatelessWidget {
  final String content;
  const SettingsSectionLabel({super.key, required this.content});
  @override
  Widget build(BuildContext context) {
    return Text(content, style: Theme.of(context).textTheme.titleLarge);
  }
}
