import 'dart:math';

import 'package:fluster_ui/widgets/command_palette_item.dart';
import 'package:flutter/material.dart';

class CommandPaletteResults extends StatelessWidget {
  final List<CommandPaletteItem> items;
  const CommandPaletteResults({super.key, required this.items});
  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        minHeight: 200,
        maxHeight: min(300, MediaQuery.sizeOf(context).height - 200),
      ),
      child: ListView.builder(
        itemCount: items.length,
        itemBuilder: (BuildContext context, int idx) {
          final item = items[idx];
          return ListTile(title: Text(item.title));
        },
      ),
    );
  }
}
