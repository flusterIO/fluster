import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:flutter/material.dart';

class CommandPaletteResult extends StatelessWidget {
  final CommandPaletteEntry item;
  final int idx;
  // Can't actually focus the list item while keeping focus on the input, but can simulate the equivalent manually wth an index.
  final bool pseudoFocused;
  const CommandPaletteResult({
    super.key,
    required this.item,
    required this.idx,
    required this.pseudoFocused,
  });
  @override
  Widget build(BuildContext context) {
    return FocusTraversalOrder(
      order: NumericFocusOrder(idx + 1),
      child: ListTile(
        focusColor: Colors.green,
        title: Text(item.label),
        subtitle: item.desc == null ? null : Text(item.desc!),
      ),
    );
  }
}
