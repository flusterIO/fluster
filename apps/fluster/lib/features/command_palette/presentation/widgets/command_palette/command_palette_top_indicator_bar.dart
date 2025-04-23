import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:flutter/material.dart';

class CommandPaletteTopIndicatorBar extends StatelessWidget {
  final CommandPaletteCategory activeCategory;
    final double width;
  const CommandPaletteTopIndicatorBar({
    super.key,
    required this.activeCategory,
        required this.width
  });
  @override
  Widget build(BuildContext context) {
    return SizedBox(height: 64, child: Row(children: [ 

                ],
            ));
  }
}
