import 'package:fluster/data_models/setting/setting_page.dart';
import 'package:fluster/state/providers/settingsPage/settings_page_provider.dart';
import 'package:fluster/static/settings/setting_pages/general_settings.dart';
import 'package:fluster/static/settings/setting_pages/keymap_settings.dart';
import 'package:fluster/static/settings/setting_pages/ui_settings.dart';
import 'package:fluster/static/settings/setting_pages/web_interface_settings.dart';
import 'package:fluster/widgets/screens/settings/widgets/setting_page_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluster/data_models/setting/setting_pages.dart';

class SettingsCategoryPageSwitch extends ConsumerWidget {
  const SettingsCategoryPageSwitch({super.key});
  SettingsPage getItemsFromPageId(SettingPageId pageId) {
    switch (pageId) {
      case SettingPageId.general:
        return general_settings;
      case SettingPageId.ui:
        return ui_settings;
      case SettingPageId.keymap:
        return keymap_settings;
      case SettingPageId.webInterface:
        return web_interface_settings;
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentSettingsState = ref.watch(settingsPageProvider);
    return SettingsPageContainer(
      pageData: getItemsFromPageId(currentSettingsState.activeCategoryId),
    );
  }
}
