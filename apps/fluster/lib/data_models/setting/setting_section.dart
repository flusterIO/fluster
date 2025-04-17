import 'package:fluster/data_models/setting/setting_abstract.dart';

class SettingSection<T extends SettingAbstract> {
  final String? label;
  final String? subtitle;
  final List<SettingAbstract> items;
  const SettingSection({this.label, this.subtitle, required this.items});
}
