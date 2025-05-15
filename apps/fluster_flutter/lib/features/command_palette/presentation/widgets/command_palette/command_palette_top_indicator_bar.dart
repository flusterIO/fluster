import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category_enum.dart';
import 'package:flutter/material.dart';

class CommandPaletteTopIndicatorBar extends StatelessWidget {
  final CommandPaletteCategory activeCategory;
  final double width;
  const CommandPaletteTopIndicatorBar({
    super.key,
    required this.activeCategory,
    required this.width,
  });
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      // height: 64,
        width: width,
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              spacing: 16,
              children: [
                Icon(activeCategory.getIcon()),
                Text(activeCategory.label),
              ],
            ),
            if (activeCategory.category != CommandPaletteCategoryId.root)
              Icon(Icons.backup),
          ],
        ),
      ),
    );
  }
}
