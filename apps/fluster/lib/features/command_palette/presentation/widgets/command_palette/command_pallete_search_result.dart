import 'package:fluster/core/static/constants/static_constants.dart';
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
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.rectangle,
        border: Border(
          left: BorderSide(
            color: pseudoFocused ? theme.primaryColor : Colors.transparent,
            width: 2,
          ),
        ),
      ),

      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16),
        child: Column(
          spacing: 2,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              item.label,
              style: TextStyle(fontSize: 14),
              maxLines: 1,
              softWrap: false,
            ),
            if (item.desc != null && item.desc != "")
              Text(
                item.desc!,
                style: TextStyle(
                  color: theme.textTheme.bodyMedium?.color?.withValues(
                    alpha: mutedTextAlpha,
                  ),
                  fontSize: 12,
                ),
                maxLines: 2,
                softWrap: true,
              ),
          ],
        ),
      ),
    );
  }
}
