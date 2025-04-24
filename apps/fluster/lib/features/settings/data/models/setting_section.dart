import 'package:fluster/features/settings/data/models/setting_abstract.dart';
import 'package:fluster/features/settings/data/models/setting_keys.dart';

class SettingSection<T extends SettingAbstract> {
  final String? label;
  final String? subtitle;
  final Map<SettingUniqueKey, T> items;
  const SettingSection({this.label, this.subtitle, required this.items});
}
