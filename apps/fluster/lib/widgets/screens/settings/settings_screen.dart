import 'package:fluster/state/providers/settingsPage/settings_page_provider.dart';
import 'package:fluster/static/settings/settings_root.dart';
import 'package:fluster/widgets/screens/settings/widgets/setting_page_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext buildContext, WidgetRef ref) {
    final currentId = ref.watch(settingsPageProvider);
    final item = getSettings().pages.firstWhere(
      (x) => x.id == currentId.activeCategoryId,
    );
    return SettingsPageContainer(pageData: item);
  }
}
