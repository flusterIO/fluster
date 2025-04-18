import 'package:fluster/state/navigation/actions/navigation_actions.dart';
import 'package:fluster/state/store.dart';
import 'package:fluster/static/extension_methods/context_extension.dart';
import 'package:fluster/static/settings/settings_root.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';

class SettingsSideMenuPanel extends StatelessWidget {
  const SettingsSideMenuPanel({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final shad = theme.extension<ShadTheme>()!;
    // final settingPageState = ref.watch(settingsPageProvider);
    final allSettings = getInitialSettings();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 12,
      children: List.generate(allSettings.pages.length, (int idx) {
        return SizedBox(
          width: double.infinity,
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () {
                globalReduxStore.dispatch(
                  SetSettingsPage(allSettings.pages[idx].id),
                );
              },
              child: AnimatedContainer(
                duration: Duration(milliseconds: 150),
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  border: Border.all(
                    color:
                        context.state.navigationState.settingPageId ==
                                allSettings.pages[idx].id
                            ? shad.primary
                            : shad.border,
                  ),
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 2,
                  children: [
                    Text(allSettings.pages[idx].label),
                    Text(
                      allSettings.pages[idx].desc,
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
