import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum CommandPaletteCategory { root, location, action }

class CommandPaletteItem {
  final String title;
  final List<CommandPaletteItem> items;
  final Widget Function()? preview;
  final Widget Function()? icon;
  final CommandPaletteCategory category;
  final void Function(BuildContext context, WidgetRef ref)? onSelect;
  const CommandPaletteItem({
    required this.title,
    required this.category,
    this.items = const [],
    this.preview,
    this.onSelect,
    this.icon,
  });
  // RESUME: Implement a fuzzy search and string similarity search here...
  Iterable<CommandPaletteItem> filterEntries(String query) {
    return items.where((CommandPaletteItem item) {
      return item.title.contains(query);
    });
  }

  CommandPaletteItem getSelectedCategory(List<int> indices) {
    assert(category == CommandPaletteCategory.root);
    if (indices.isEmpty) {
      return this;
    }
    var item = this;
    do {
      item = item.items[indices[0]];
      indices.removeAt(0);
    } while (indices.isNotEmpty);
    return item;
  }
}
