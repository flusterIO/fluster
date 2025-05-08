import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';

class AppendCommandPaletteCategoryAction extends FlusterAction {
  final CommandPaletteCategory cat;
  AppendCommandPaletteCategoryAction(this.cat);

  @override
  Future<GlobalAppState> reduce() async {
    await cat.onEnter();
    final items = await cat.getItemsOnEnter();
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        navigationStack: [...state.commandPaletteState.navigationStack, cat],
        filteredItems: items,
        open: true,
        selectedIndex: 0,
        view: cat.layout
      ),
    );
  }
}
