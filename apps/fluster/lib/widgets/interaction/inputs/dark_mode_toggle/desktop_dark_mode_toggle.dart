import 'package:fluster/state/providers/theme/theme_provider.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class DarkModeToggle extends ConsumerWidget {
  const DarkModeToggle({super.key});

  void setThemeMode(ThemeMode themeMode, WidgetRef ref) {
    ref.read(themeProvider.notifier).state = themeMode;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ThemeMode currentTheme = ref.watch(themeProvider);
    final ShadTheme? theme = Theme.of(context).extension<ShadTheme>();
    return Row(
      children: <Widget>[
        Tooltip(
          message: 'Light mode',
          triggerMode: TooltipTriggerMode.longPress,
          child: IconButton(
            icon: const Icon(Icons.sunny),
            color: currentTheme == ThemeMode.light ? theme?.primary : null,
            onPressed: () {
              setThemeMode(ThemeMode.light, ref);
              // context.read<GlobalBloc>().add(SetDarkMode(ThemeMode.dark));
            },
          ),
        ),
        Tooltip(
          message: 'Dark mode',
          triggerMode: TooltipTriggerMode.longPress,
          child: IconButton(
            icon: const Icon(Icons.dark_mode),
            color: currentTheme == ThemeMode.dark ? theme?.primary : null,
            onPressed: () {
              setThemeMode(ThemeMode.dark, ref);
              // context.read<GlobalBloc>().add(SetDarkMode(ThemeMode.dark));
            },
          ),
        ),
        Tooltip(
          triggerMode: TooltipTriggerMode.longPress,
          message: 'Use system theme',
          child: IconButton(
            icon: const Icon(Icons.api),
            color: currentTheme == ThemeMode.system ? theme?.primary : null,
            onPressed: () {
              setThemeMode(ThemeMode.system, ref);
            },
          ),
        ),
      ],
    );
  }
}
