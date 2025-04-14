import 'package:fluster/widgets/interaction/inputs/dark_mode_toggle/desktop_dark_mode_toggle.dart';
import 'package:fluster/widgets/interaction/inputs/path_picker/path_picker_input_desktop.dart';
import 'package:fluster/widgets/screens/settings/widgets/section.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class GeneralSettingsCategoryPage extends ConsumerWidget {
  final _formKey = GlobalKey<FormState>();
  final myController = TextEditingController();

  GeneralSettingsCategoryPage({super.key});
  // @override
  // void dispose() {
  //   // Clean up the controller when the widget is disposed.
  //   myController.dispose();
  //   super.dispose();
  // }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // final theme = Theme.of(context);
    // final shad = theme.extension<ShadTheme>()!;
    return SingleChildScrollView(
      // behavior: MaterialScrollBehavior(),
      // axisDirection: AxisDirection.down,
      // clipBehavior: Clip.antiAlias,
      // dragStartBehavior: DragStartBehavior.start,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 32),
        child: Form(
          key: _formKey,
          child: Column(
            spacing: 32,
            children: [
              SettingSection(label: "Dark Mode", children: [DarkModeToggle()]),
              SettingSection(
                label: "Bibliography",
                children: [
                    PathPickerInput(formKey: _formKey,)
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
