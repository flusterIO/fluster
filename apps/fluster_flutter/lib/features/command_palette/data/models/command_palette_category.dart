import 'package:async_redux/async_redux.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/state/actions/append_command_palette_category.dart';
import 'package:fluster/features/command_palette/state/command_palette_state.dart';
import 'package:flutter/material.dart';

abstract class CommandPaletteCategory extends CommandPaletteEntry {
  final CommandPaletteView layout;
  const CommandPaletteCategory({
    required super.label,
    required super.category,
    required super.desc,
    this.layout = CommandPaletteView.list,
  });

  Future<void> onEnter() async {}
  Future<List<CommandPaletteEntry>> getItemsOnEnter();
  Future<List<CommandPaletteEntry>> getItemsOnQueryChange(String query);

  IconData getIcon();

  @override
  void callAction(context) {
    context.dispatch(AppendCommandPaletteCategoryAction(this));
  }
}
