import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/state/nested_state/layout_state/panels/actions/ui_actions.dart';
import 'package:fluster/core/state/store.dart';
import 'package:flutter/material.dart';

class DarkModeToggle extends StatelessWidget {
  const DarkModeToggle({super.key});

  void setThemeMode(ThemeMode themeMode) {
    globalReduxStore.dispatch(SetThemeModeAction(themeMode));
  }

  @override
  Widget build(BuildContext context) {
    final ThemeMode currentTheme = context.state.uiState.themeMode;
    final theme = Theme.of(context);
    return Row(
      children: <Widget>[
        Tooltip(
          message: 'Light mode',
          triggerMode: TooltipTriggerMode.longPress,
          child: IconButton(
            icon: const Icon(Icons.sunny),
            color: currentTheme == ThemeMode.light ? theme.primaryColor : null,
            onPressed: () {
              setThemeMode(ThemeMode.light);
              // context.read<GlobalBloc>().add(SetDarkMode(ThemeMode.dark));
            },
          ),
        ),
        Tooltip(
          message: 'Dark mode',
          triggerMode: TooltipTriggerMode.longPress,
          child: IconButton(
            icon: const Icon(Icons.dark_mode),
            color: currentTheme == ThemeMode.dark ? theme.primaryColor : null,
            onPressed: () {
              setThemeMode(ThemeMode.dark);
              // context.read<GlobalBloc>().add(SetDarkMode(ThemeMode.dark));
            },
          ),
        ),
        Tooltip(
          triggerMode: TooltipTriggerMode.longPress,
          message: 'Use system theme',
          child: IconButton(
            icon: const Icon(Icons.api),
            color: currentTheme == ThemeMode.system ? theme.primaryColor : null,
            onPressed: () {
              setThemeMode(ThemeMode.system);
            },
          ),
        ),
      ],
    );
  }
}
