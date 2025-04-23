import 'package:fluster_ui/widgets/command_palette/models/command_palette_category.dart';
import 'package:flutter/material.dart';

class CommandPaletteTopIndicatorBar extends StatelessWidget {
  final CommandPaletteCategory activeCategory;
  const CommandPaletteTopIndicatorBar({
    super.key,
    required this.activeCategory,
  });
  @override
  Widget build(BuildContext context) {
    return SizedBox(height: 64, child: Row(children: [ 

                ],
            ));
  }
}
