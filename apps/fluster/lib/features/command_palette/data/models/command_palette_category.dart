import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/state/actions/append_command_palette_category.dart';
import 'package:flutter/material.dart';

abstract class CommandPaletteCategory extends CommandPaletteEntry {
  const CommandPaletteCategory({
    required super.label,
    required super.category,
    required super.desc,
    required super.items,
  });

  int length();

  CommandPaletteEntry getItem(int idx);

  IconData getIcon();

  @override
  void callAction(String src) {
        print("Source in category: ${src}");
    globalReduxStore.dispatch(AppendCommandPaletteCategoryAction(this));
  }
}
