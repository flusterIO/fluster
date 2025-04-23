import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

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
    final theme = Theme.of(context);
    return FocusTraversalOrder(
      order: const NumericFocusOrder(0),
      child: TextField(
        maxLines: 1,
        controller: widget.controller,
        autofocus: true,
        // focusNode: widget.focusNode,
        decoration: InputDecoration(
          // border: OutlineInputBorder(),
          border: InputBorder.none,
          hintText: "Search...",
          prefixIcon: Icon(FluentIcons.search_48_filled),
          filled: true,
          fillColor: theme.scaffoldBackgroundColor,
        ),
        stylusHandwritingEnabled: true,
      ),
    );
  }
}
