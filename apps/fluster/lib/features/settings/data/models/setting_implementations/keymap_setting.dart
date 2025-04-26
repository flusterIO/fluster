import 'package:fluster/core/global_actions/global_action.dart';
import 'package:fluster/features/settings/data/models/setting_abstract.dart';

enum KeymapEntryType { global, commandPaletteInput }

// RESUME: Come back here and implement the toString and fromString methods to properly parse and store each keymap as a string. Check the keys and format in the main.dart/app.dart file and adjust accordingly.
class KeymapSetting extends SettingAbstract<String> {
  final GlobalAction action;
  final KeymapEntryType keymapType;
  const KeymapSetting({
    required super.value,
    required super.defaultValue,
    required super.label,
    required super.settingUniqueKey,
    required super.inputKey,
    required this.action,
    required this.keymapType,
    super.desc,
  });

  String formatEntry() {
    return action.toString();
  }

  GlobalAction fromFormattedEntry(String value) {
    return GlobalAction.fromFormattedEntry(
      id: action.globalActionId,
      value: value,
    );
  }

  @override
  Future<void> read() {
    // TODO: implement read
    throw UnimplementedError();
  }

  @override
  Future<String> save() {
    // TODO: implement save
    throw UnimplementedError();
  }
}
