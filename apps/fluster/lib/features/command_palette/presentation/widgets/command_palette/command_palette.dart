import 'dart:math';

import 'package:fluster/core/models/key_press_listener/key_press_listener.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_search_input.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_top_indicator_bar.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_pallete_search_result.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CommandPaletteWidget extends HookWidget {
  final List<CommandPaletteEntry> items = [];
  final List<CommandPaletteCategory> navStack;
  final List<FlusterKeyPressListener> listeners;

  KeyEventResult handleKeyPress(FocusNode node, RawKeyEvent event) {
    for (var k in listeners) {
      k.listener(node, event);
    }
    return KeyEventResult.ignored;
  }

  CommandPaletteWidget({
    super.key,
    required this.navStack,
    required this.listeners,
  });
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final controller = useSearchController();
    final focusScope = useFocusScopeNode();
    final width = min(size.width - 80, 768).toDouble();
    return FocusScope(
      node: focusScope,
      autofocus: true,
      child: Center(
        child: Container(
          width: width,
          decoration: BoxDecoration(
            border: Border.all(width: 1, color: Theme.of(context).primaryColor),
          ),
          child: Column(
            spacing: 0,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CommandPaletteTopIndicatorBar(
                activeCategory: navStack[navStack.length - 1],
                width: width,
              ),
              CommandPaletteSearchInput(controller: controller),
              // CommandPaletteResults(items: items, controller: scrollController),
              ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight: 200,
                  maxHeight: min(300, MediaQuery.sizeOf(context).height - 200),
                ),
                child: ListView.builder(
                  itemCount: items.length,
                  itemBuilder: (BuildContext childContext, int idx) {
                    return CommandPaletteResult(item: items[idx]);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
