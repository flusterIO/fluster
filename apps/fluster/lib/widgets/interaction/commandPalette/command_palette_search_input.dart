import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';

final GlobalKey<CommandPaletteSearchInputState> commandPaletteInputKey =
    GlobalKey<CommandPaletteSearchInputState>(debugLabel: 'app shell');

class CommandPaletteSearchInput extends StatefulWidget {
  final TextEditingController controller;
  const CommandPaletteSearchInput({super.key, required this.controller});
  @override
  State<CommandPaletteSearchInput> createState() =>
      CommandPaletteSearchInputState();
}

class CommandPaletteSearchInputState extends State<CommandPaletteSearchInput> {
  CommandPaletteSearchInputState();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context).extension<ShadTheme>();
    return FocusTraversalOrder(
      order: const NumericFocusOrder(1),
      child: Container(
        color: theme?.popover,
        child: TextField(
          maxLines: 1,
          controller: widget.controller,
          // focusNode: widget.focusNode,
          decoration: InputDecoration(
            border: OutlineInputBorder(),
            hintText: "Search...",
            fillColor: Colors.green,
          ),
        ),
      ),
    );
  }
}
