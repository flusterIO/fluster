import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';

class AppendCommandPaletteCategoryAction extends FlusterAction {
  final CommandPaletteCategory cat;
  AppendCommandPaletteCategoryAction(this.cat);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        navigationStack: [...state.commandPaletteState.navigationStack, cat],
        filteredItems: cat.items,
        open: true,
        selectedIndex: 0,
      ),
    );
  }
}
