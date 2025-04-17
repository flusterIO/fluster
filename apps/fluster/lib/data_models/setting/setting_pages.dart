
import 'package:fluster/data_models/setting/setting_section.dart';

enum SettingPageId { webInterface, ui, keymap, general, ai, searchAndTaggables }

class SettingPageData {
  final String label;
  final String desc;
  final SettingPageId id;
  final List<SettingSection> sections;
  const SettingPageData({
    required this.label,
    required this.desc,
    required this.id,
    required this.sections,
  });
}
