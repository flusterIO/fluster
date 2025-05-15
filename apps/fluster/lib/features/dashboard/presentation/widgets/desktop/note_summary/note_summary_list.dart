import 'package:fluster/features/dashboard/presentation/widgets/desktop/note_summary/note_summary_item.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;
import 'package:flutter/material.dart';

class NoteSummaryList extends StatelessWidget {
  final List<native.MdxNoteSummary> items;
  const NoteSummaryList({super.key, required this.items});
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (BuildContext _, int idx) {
        return NoteSummaryItem(item: items[idx]);
      },
    );
  }
}
