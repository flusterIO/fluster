import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/state/providers/settingsPage/settings_page_provider.dart';
import 'package:fluster/static/settings/settings_root.dart';
import 'package:fluster/widgets/interaction/inputs/setting_page/setting_page_input.dart';
import 'package:fluster/widgets/screens/settings/widgets/section.dart';
import 'package:fluster/widgets/wrappers/page_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SettingsPageContainer extends ConsumerWidget {
  final _formKey = GlobalKey<FormState>();
  final SettingPageData pageData;

  SettingsPageContainer({super.key, required this.pageData});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activeId = ref.watch(settingsPageProvider);
    final activeSettingsPage = getSettings().pages.firstWhere(
      (x) => x.id == activeId.activeCategoryId,
    );
    return PageContainer(
      child: Form(
        key: _formKey,
        child: Column( 
                    children: List.generate(activeSettingsPage.sections.length, (int idx) {
                        return SettingSection(
                            label: activeSettingsPage.sections[idx].label,
                            subtitle: activeSettingsPage.sections[idx].subtitle,
                            children: List.generate(
                               activeSettingsPage.sections[idx].items.length, (int idx2) {
                                return SettingPageInput(
                                    item: activeSettingsPage.sections[idx].items[idx2],
                                    formKey: _formKey
                                );
                        }));
                    }),
                ),
      ),
    );
  }
}
