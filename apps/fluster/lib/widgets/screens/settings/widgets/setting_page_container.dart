import 'package:fluster/data_models/setting/setting_abstract.dart';
import 'package:fluster/data_models/setting/setting_page.dart';
import 'package:fluster/widgets/interaction/inputs/setting_page/setting_page_input.dart';
import 'package:fluster/widgets/wrappers/page_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SettingsPageContainer extends ConsumerWidget {
  final _formKey = GlobalKey<FormState>();
  final SettingsPage pageData;

  SettingsPageContainer({super.key, required this.pageData});
  // @override
  // void dispose() {
  //   // Clean up the controller when the widget is disposed.
  //   myController.dispose();
  //   super.dispose();
  // }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PageContainer(
      child: Form(
        key: _formKey,
        child: Column(
          children: List.generate(pageData.items.length, (int idx) {
            return SettingPageInput(
              item: pageData.items[idx],
              formKey: _formKey,
            );
          }),
        ),
      ),
    );
  }
}
