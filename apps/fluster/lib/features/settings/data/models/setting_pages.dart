import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:fluster/features/settings/data/models/setting_section.dart';

abstract class SettingPageDataAbstract<T extends SettingAbstract, J> {
  final String label;
  final String desc;
  final SettingPageId id;
  final Map<J, SettingSection<T>> sections;
  const SettingPageDataAbstract({
    required this.label,
    required this.desc,
    required this.id,
    required this.sections,
  });
}

class SettingPageData<T extends SettingAbstract, J>
    extends SettingPageDataAbstract<T, J> {
  const SettingPageData({
    required super.label,
    required super.desc,
    required super.id,
    required super.sections,
  });
}
