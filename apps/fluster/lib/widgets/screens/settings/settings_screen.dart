import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/widgets/screens/settings/widgets/setting_page_container.dart';
import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final item = context.state.settingsState.settings?.pages.values.firstWhere(
      (x) => x.id == context.state.navigationState.settingPageId,
    );
    return item != null ? SettingsPageContainer(pageData: item) : Text("");
  }
}
