import 'package:flutter/material.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart';

class NoteSummaryItem extends StatelessWidget {
  final MdxNoteSummary item;
  const NoteSummaryItem({super.key, required this.item});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Text(item.frontMatter.title, style: theme.textTheme.titleMedium),
    );
  }
}
