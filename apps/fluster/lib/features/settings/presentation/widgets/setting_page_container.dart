import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/page_container.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:fluster/features/settings/presentation/widgets/section.dart';
import 'package:fluster/features/settings/presentation/widgets/setting_inputs/setting_page_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class SettingsPageContainer extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final SettingPageDataAbstract pageData;

  SettingsPageContainer({super.key, required this.pageData});

  @override
  Widget build(BuildContext context) {
    final activeId = context.state.navigationState.settingPageId;
    final activeSettingsPage = context.state.settingsState.settings.pages.values
        .firstWhere((x) => x.id == activeId);
    return PageContainer(
      child: Form(
        key: _formKey,
        child: Column(
          spacing: 48,
          children: List.generate(activeSettingsPage.sections.length, (
            int idx,
          ) {
            final sec = activeSettingsPage.sections[idx];
            if (sec == null) {
              throw FormatException(
                "Attempted to access a settings section that does not exist.",
              );
            }
            final itemValues = useMemoized(
              () =>
                  activeSettingsPage.sections[idx]?.items.values.toList() ?? [],
              [],
            );
            return SettingSection(
              label: sec.label,
              subtitle: sec.subtitle,
              children: List.generate(sec.items.length, (int idx2) {
                return SettingPageInput(
                  item: itemValues[idx2],
                  formKey: _formKey,
                );
              }),
            );
          }),
        ),
      ),
    );
  }
}
