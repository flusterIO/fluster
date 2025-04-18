import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/static/settings/settings_root.dart';
import 'package:fluster/widgets/screens/settings/widgets/setting_page_container.dart';
import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final item = getInitialSettings().pages.firstWhere(
      (x) => x.id == context.state.navigationState.settingPageId,
    );
    return SettingsPageContainer(pageData: item);
  }
}
