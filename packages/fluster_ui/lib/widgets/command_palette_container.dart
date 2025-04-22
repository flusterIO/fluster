import 'dart:math';

import 'package:fluster_ui/widgets/command_palette_item.dart';
import 'package:fluster_ui/widgets/command_palette_search_input.dart';
import 'package:fluster_ui/widgets/command_pallete_search_results.dart';
import 'package:fluster_ui/widgets/command_palette_top_indicator_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

// RESUME: Come back here and implement a keydown listener that calls a method to check against a list of other keymap entries. Back is already created but not yet implemented.
class CommandPalette extends HookWidget {
  late CommandPaletteItem root;
  final TextEditingController controller = TextEditingController();
  final List<int> selections = [];
  final void Function(bool) setIsOpen;
  final bool isOpen;
  final List<CommandPaletteItem> items;
  CommandPalette({
    super.key,
    required this.setIsOpen,
    required this.isOpen,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    final controller = useSearchController();
    final focusNode = useFocusNode(descendantsAreFocusable: true);
    final size = MediaQuery.sizeOf(context);
    return GestureDetector(
      onTap: () {
        setIsOpen(false);
      },
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 64, horizontal: 64),
        decoration: BoxDecoration(color: Colors.black),
        child: Positioned(
          top: 0,
          left: 0,
          width: size.width,
          height: size.height,
          child: Focus(
            focusNode: focusNode,
            autofocus: true,
            // policy: FocusTraversalPolicy(,
            child: Center(
              child: SizedBox(
                width: min(size.width - 80, 768),
                child: Column(
                  children: [
                    CommandPaletteTopIndicatorBar(),
                    CommandPaletteSearchInput(controller: controller),
                    CommandPaletteResults(items: items),
                    Text("here"),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
