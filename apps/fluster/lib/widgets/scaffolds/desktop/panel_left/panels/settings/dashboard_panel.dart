import 'package:fluster/state/providers/settingsPage/settings_page_provider.dart';
import 'package:fluster/static/settings/setting_categories.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SettingsSideMenuPanel extends ConsumerWidget {
  const SettingsSideMenuPanel({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final shad = theme.extension<ShadTheme>()!;
    final settingPageState = ref.watch(settingsPageProvider);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 12,
      children: List.generate(SettingPageCategories.items.length, (int idx) {
        return SizedBox(
          width: double.infinity,
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () {
                final currentState = ref.read(settingsPageProvider);
                ref.read(settingsPageProvider.notifier).state = currentState
                    .copyWith(
                      activeCategoryId: SettingPageCategories.items[idx].id,
                    );
              },
              child: AnimatedContainer(
                duration: Duration(milliseconds: 150),
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  border: Border.all(
                    color:
                        settingPageState.activeCategoryId ==
                                SettingPageCategories.items[idx].id
                            ? shad.primary
                            : shad.border,
                  ),
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                  // color:
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 2,
                  children: [
                    Text(SettingPageCategories.items[idx].label),
                    Text(
                      SettingPageCategories.items[idx].desc,
                      style: theme.textTheme.bodySmall!.copyWith(
                        color: shad.mutedForeground,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      }),
    );
  }
}
