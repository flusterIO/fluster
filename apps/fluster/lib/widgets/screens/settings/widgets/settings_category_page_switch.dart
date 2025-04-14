import 'package:fluster/state/providers/settingsPage/settings_page_provider.dart';
import 'package:fluster/widgets/screens/settings/widgets/settingCategoryPages/general.dart';
import 'package:fluster/widgets/screens/settings/widgets/settingCategoryPages/keymap.dart';
import 'package:fluster/widgets/screens/settings/widgets/settingCategoryPages/styles.dart';
import 'package:fluster/widgets/screens/settings/widgets/settingCategoryPages/web_interface.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluster/static/settings/setting_categories.dart';

class SettingsCategoryPageSwitch extends ConsumerWidget {
  const SettingsCategoryPageSwitch({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentSettingsState = ref.watch(settingsPageProvider);
    switch (currentSettingsState.activeCategoryId) {
      case SettingCategory.general:
        return GeneralSettingsCategoryPage();
      case SettingCategory.styles:
        return StylesSettingsCategoryPage();
      case SettingCategory.keymap:
        return KeymapSettingsCategoryPage();
      case SettingCategory.webInterface:
        return WebInterfaceSettingsCategoryPage();
    }
    return GeneralSettingsCategoryPage();
  }
}
