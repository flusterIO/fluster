import 'package:fluster_ui/widgets/command_palette/command_palette.dart';
import 'package:fluster_ui/widgets/command_palette/command_palette_types.dart';
import 'package:fluster_ui/widgets/command_palette/models/command_palette_category.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

@immutable
class CommandPalette extends HookWidget {
  final TextEditingController controller = TextEditingController();
  final List<int> selections = [];
  final void Function(bool) setIsOpen;
  final bool isOpen;
  final List<FlusterKeyPressListener> listeners;
  final CommandPaletteCategory initialCategory;
  // final KeyEventResultjV
  CommandPalette({
    super.key,
    required this.setIsOpen,
    required this.isOpen,
    required this.initialCategory,
    required this.listeners,
  });

  @override
  Widget build(BuildContext context) {
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
        child: CommandPaletteWidget(
          navStack: <CommandPaletteCategory>[initialCategory],
          listeners: listeners,
        ),
      ),
    );
  }
}
