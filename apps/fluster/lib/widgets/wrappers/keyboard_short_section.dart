import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_section.dart';
import 'package:flutter/material.dart';

class KeyboardShortcutSection extends StatelessWidget {
  final SettingSection<SettingAbstract<dynamic>> sec;
  const KeyboardShortcutSection({
    super.key,
    required this.sec,
  });
  @override
  Widget build(BuildContext context) {
    return Text(sec.label!);
  }
}
