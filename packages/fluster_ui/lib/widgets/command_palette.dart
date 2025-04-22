import 'dart:math';

import 'package:fluster_ui/widgets/command_palette_item.dart';
import 'package:fluster_ui/widgets/command_palette_search_input.dart';
import 'package:fluster_ui/widgets/command_palette_top_indicator_bar.dart';
import 'package:fluster_ui/widgets/command_pallete_search_results.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CommandPaletteWidget extends HookWidget {
  final FocusScopeNode focusScope;
  final List<CommandPaletteItem> items;
  const CommandPaletteWidget({
    super.key,
    required this.focusScope,
    required this.items,
  });
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);

    final controller = useSearchController();
    return FocusScope(
      node: focusScope,
      // focusNode: focusScope,
      autofocus: true,
      child: Center(
        child: Container(
          width: min(size.width - 80, 768),
          decoration: BoxDecoration(
            border: Border.all(width: 1, color: Theme.of(context).primaryColor),
          ),
          child: Column(
            spacing: 0,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CommandPaletteTopIndicatorBar(),
              CommandPaletteSearchInput(controller: controller),
              CommandPaletteResults(items: items),
              Text("here"),
            ],
          ),
        ),
      ),
    );
  }
}
