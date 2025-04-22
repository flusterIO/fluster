import 'dart:math';

import 'package:fluster_ui/widgets/command_palette.dart';
import 'package:fluster_ui/widgets/command_palette_item.dart';
import 'package:fluster_ui/widgets/command_palette_search_input.dart';
import 'package:fluster_ui/widgets/command_pallete_search_results.dart';
import 'package:fluster_ui/widgets/command_palette_top_indicator_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

enum FlusterKeyPressResult {
  actionTakenCanIgnoreRest,
  unaffectedContinueAsNormal,
}

class FlusterKeyPressListener {
  FlusterKeyPressListener({required this.listener});
  final FlusterKeyPressResult Function(FocusNode, RawKeyEvent) listener;
}

class CommandPalette extends HookWidget {
  late CommandPaletteItem root;
  final TextEditingController controller = TextEditingController();
  final List<int> selections = [];
  final void Function(bool) setIsOpen;
  final bool isOpen;
  final List<CommandPaletteItem> items;
  final List<FlusterKeyPressListener> listeners;
  // final KeyEventResultjV
  CommandPalette({
    super.key,
    required this.setIsOpen,
    required this.isOpen,
    required this.items,
    required this.listeners,
  });

  KeyEventResult handleKeyPress(FocusNode node, RawKeyEvent event) {
    for (var k in listeners) {
      k.listener(node, event);
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final focusScope = useFocusScopeNode(
      onKey: handleKeyPress,
      canRequestFocus: isOpen,
    );
    return GestureDetector(
      onTap: () {
        setIsOpen(false);
      },
      child: AnimatedContainer(
        padding: const EdgeInsets.symmetric(vertical: 64, horizontal: 64),
        decoration: BoxDecoration(
          color: isOpen ? Colors.black : Colors.transparent,
        ),
        duration: const Duration(milliseconds: 3000),
        curve: Curves.easeOut,
        child: CommandPaletteWidget(focusScope: focusScope, items: items),
      ),
    );
  }
}
