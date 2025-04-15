import 'package:flutter/material.dart';

class NoteSummary {
  final String title;
  final String summary;
  const NoteSummary({required this.title, required this.summary});
}

class NotesTable extends StatefulWidget {
  const NotesTable({super.key});
  @override
  State<NotesTable> createState() => _NotesTableState();
}

class _NotesTableState extends State<NotesTable> {
  @override
  Widget build(BuildContext context) {
    return DataTable(rows: [], columns: [
            DataColumn(label: Text("Title")),
            DataColumn(label: Text("Summary")),
            DataColumn(label: Text("Created")),
            DataColumn(label: Text("Edited")),
        ]);
  }
}
