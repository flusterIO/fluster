import 'package:fluster/data_models/setting/setting_implementations/keymap_setting.dart';
import 'package:flutter/widgets.dart';

class KeymapEntryInput extends StatefulWidget {
  final KeymapSetting setting;
  const KeymapEntryInput({super.key, required this.setting});
  @override
  State<KeymapEntryInput> createState() => _KeymapEntryInputState();
}

class _KeymapEntryInputState extends State<KeymapEntryInput> {
  @override
  Widget build(BuildContext context) {
    return Text("Input");
  }
}

