import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_section.dart';

enum SettingPageId { webInterface, ui, keymap, general, ai, searchAndTaggables }

abstract class SettingPageDataAbstract<T extends SettingAbstract> {
  final String label;
  final String desc;
  final SettingPageId id;
  final List<SettingSection<T>> sections;
  const SettingPageDataAbstract({
    required this.label,
    required this.desc,
    required this.id,
    required this.sections,
  });
}

class SettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T> {
  const SettingPageData({
    required super.label,
    required super.desc,
    required super.id,
    required super.sections,
  });
}

class KeymapSettingPageData<T extends SettingAbstract>
    extends SettingPageDataAbstract<T> {
  const KeymapSettingPageData({
    required super.label,
    required super.desc,
    required super.sections,
    super.id = SettingPageId.keymap,
  });
}
