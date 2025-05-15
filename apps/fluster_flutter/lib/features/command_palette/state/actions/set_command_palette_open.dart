import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';

class SetCommandPaletteOpenAction extends FlusterAction {
  final bool open;
  final CommandPaletteCategory? initialCategory;
  SetCommandPaletteOpenAction(this.open, {required this.initialCategory});

  @override
  Future<GlobalAppState> reduce() async {
    assert(
      !(open && initialCategory == null),
      "Received a SetCommandPaletteOpenAction request without an initial category.",
    );
    if (open == false) {
      closeCommandPalette();
      // desktopScaffoldKey.currentContext?.pop();
    }
    final items = await initialCategory?.getItemsOnEnter() ?? [];
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        open: open,
        navigationStack: initialCategory != null
            ? <CommandPaletteCategory>[initialCategory!]
            : [],
        filteredItems: items,
        selectedIndex: open ? state.commandPaletteState.selectedIndex : 0,
      ),
    );
  }
}
