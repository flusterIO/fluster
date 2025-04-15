import 'package:fluster/static/settings/setting_pages/general_settings.dart';
import 'package:fluster/widgets/interaction/inputs/setting_page/setting_page_input.dart';
import 'package:fluster/widgets/wrappers/page_container.dart';
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
    return PageContainer(
      child: Form(
        key: _formKey,
        child: Column(
          children: List.generate(general_settings.items.length, (int idx) {
            return SettingPageInput(
              item: general_settings.items[idx],
              formKey: _formKey,
            );
          }),
        ),
      ),
    );
  }
}
