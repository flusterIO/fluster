import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/static/global_keys.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:go_router/go_router.dart';


class SetCommandPaletteOpenAction extends FlusterAction {
  final bool open;
  final CommandPaletteCategory? initialCategory;
  SetCommandPaletteOpenAction(this.open, {required this.initialCategory});

  @override
  GlobalAppState reduce() {
    assert(
      !(open && initialCategory == null),
      "Received a SetCommandPaletteOpenAction request without an initial category.",
    );
    print("here?: ${open}");
    // if (open == false) {
    //   desktopScaffoldKey.currentContext?.pop();
    // }
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        open: open,
        navigationStack: initialCategory != null
            ? <CommandPaletteCategory>[initialCategory!]
            : [],
        filteredItems: initialCategory != null
            ? initialCategory!.items
            : <CommandPaletteEntry>[],
        selectedIndex: open ? state.commandPaletteState.selectedIndex : 0,
      ),
    );
  }
}
