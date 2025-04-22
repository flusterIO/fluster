import 'dart:math';

import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_item.dart';
import 'package:flutter/material.dart';

class CommandPaletteResults extends StatefulWidget {
  final List<CommandPaletteItem> items;
  const CommandPaletteResults({super.key, required this.items});
  @override
  State<CommandPaletteResults> createState() => _CommandPaletteResultsState();
}

class _CommandPaletteResultsState extends State<CommandPaletteResults> {
  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        // minHeight: 200,
        maxHeight: min(300, MediaQuery.sizeOf(context).height - 200),
      ),
      child: ListView.builder(
        itemCount: widget.items.length,
        itemBuilder: (BuildContext context, int idx) {
          final item = widget.items[idx];
          final theme = Theme.of(context).extension<ShadTheme>();
          return ListTile(
            title: Text(item.title, style: TextStyle(color: theme?.foreground)),
          );
        },
      ),
    );
  }
}
