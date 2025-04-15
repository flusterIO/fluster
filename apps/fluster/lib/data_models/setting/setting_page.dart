import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';


class SettingsPage {
    final String label;
    final String desc;
    final List<SettingAbstract> items;
    final SettingPageId pageId;
    const SettingsPage({required this.label, required this.items, required this.desc, required this.pageId});
}
