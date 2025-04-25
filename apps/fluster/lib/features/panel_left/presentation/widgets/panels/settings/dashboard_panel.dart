import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/navigation/presentation/state/actions/navigation_actions.dart';
import 'package:flutter/material.dart';

class SettingsSideMenuPanel extends StatelessWidget {
  const SettingsSideMenuPanel({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final pages =
        context.state.settingsState.settings.pages.values.toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 12,
      children: List.generate(pages.length, (int idx) {
        return SizedBox(
          width: double.infinity,
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () {
                globalReduxStore.dispatch(SetSettingsPageAction(pages[idx].id));
              },
              child: AnimatedContainer(
                duration: Duration(milliseconds: 50),
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  border: Border.all(
                    color:
                        context.state.navigationState.settingPageId ==
                                pages[idx].id
                            ? theme.primaryColor
                            : Colors.transparent,
                  ),
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 2,
                  children: [
                    Text(pages[idx].label),
                    Text(
                      pages[idx].desc,
                      style: theme.textTheme.bodySmall!.copyWith(
                        // color: theme.textTheme.headlineSmall,
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
