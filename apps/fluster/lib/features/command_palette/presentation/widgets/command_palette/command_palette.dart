import 'dart:math';
import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/models/string_similarity_result.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_no_results.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_search_input.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_top_indicator_bar.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_pallete_search_result.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_back.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_filtered_items.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_selected_index_action.dart';
import 'package:fluster/features/settings/data/models/keymap_setting_page_data.dart';
import 'package:fluster/features/settings/data/models/setting_page_ids/setting_page_ids.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CommandPaletteWidget extends HookWidget {
  KeyEventResult handleKeyPress(
    FocusNode node,
    KeyEvent e,
    TextEditingController controller,
    KeymapSettingPageData settingData,
    ValueNotifier<bool> isEmptyInput,
    void Function() onAccept,
  ) {
    // Reset the isEmptyInput field early if the input is no longer empty.
    if (controller.text != "") {
      isEmptyInput.value = false;
    }

    if (e.logicalKey == LogicalKeyboardKey.escape) {
      globalReduxStore.dispatch(
        SetCommandPaletteOpenAction(false, initialCategory: null),
      );
      return KeyEventResult.handled;
    }

    // If the input is empty for the first time, set the isEmptyInput value to true.
    if (controller.text == "" && !isEmptyInput.value) {
      isEmptyInput.value = true;
      return KeyEventResult.ignored;
    }
    // If the input is already empty, then close the command palette or go back.
    if (e.logicalKey == LogicalKeyboardKey.backspace) {
      if (isEmptyInput.value && e.synthesized == false) {
        globalReduxStore.dispatch(CommandPaletteBackAction());
      }
      return KeyEventResult.ignored;
    }

    if (SingleActivator(
      LogicalKeyboardKey.tab,
      shift: true,
    ).accepts(e, HardwareKeyboard.instance)) {
      globalReduxStore.dispatch(SetCommandPaletteSelectedIndexAction(-1));
      return KeyEventResult.handled;
    }

    if (SingleActivator(
      LogicalKeyboardKey.tab,
      shift: false,
    ).accepts(e, HardwareKeyboard.instance)) {
      globalReduxStore.dispatch(SetCommandPaletteSelectedIndexAction(1));
      return KeyEventResult.handled;
    }

    if (e.logicalKey == LogicalKeyboardKey.enter) {
      // RESUME: Come back here and implement the search functionality.
      onAccept();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  const CommandPaletteWidget({super.key});

  void handleQueryChange(String queryValue, List<CommandPaletteEntry> items) {
    final similarityResults =
        StringSimilarityResult.fromArray<CommandPaletteEntry>(
          items,
          queryValue,
          (x) => "${x.label} ${x.desc ?? ''}",
          threshold: 0.1,
        );
    globalReduxStore.dispatch(
      SetCommandPaletteFilteredItems(similarityResults.toList()),
    );
  }

  @override
  Widget build(BuildContext context) {
    final navStack = context.state.commandPaletteState.navigationStack;
    if (navStack.isEmpty) {
      return Container();
    }
    final activeStackItem = navStack[navStack.length - 1];
    final size = MediaQuery.sizeOf(context);
    final focusScope = useFocusScopeNode();
    final isEmptyInput = useState(true);
    final editController = useTextEditingController();
    editController.addListener(
      () => handleQueryChange(
        editController.text,
        navStack.isNotEmpty ? navStack[navStack.length - 1].items : [],
      ),
    );
    useEffect(() {
      if (!isEmptyInput.value) {
        globalReduxStore.dispatch(ResetCommandPaletteIndex());
      }
      return () {};
    }, [isEmptyInput]);
    focusScope.onKeyEvent = (FocusNode n, KeyEvent e) => handleKeyPress(
      n,
      e,
      editController,
      context.state.settingsState.settings.pages[SettingPageId.keymap]
          as KeymapSettingPageData,
      isEmptyInput,
      () => activeStackItem
          .items[context.state.commandPaletteState.selectedIndex]
          .enter(),
    );
    final width = min(size.width - 80, 768).toDouble();
    final theme = Theme.of(context);
    return FocusScope(
      node: focusScope,
      autofocus: true,
      descendantsAreFocusable: true,
      child: Center(
        child: Card(
          // width: width,
          // decoration: BoxDecoration(
          //   border: Border.all(width: 1, color: theme.dividerColor),
          //   color: theme.cardColor,
          //   borderRadius: BorderRadius.all(
          //     Radius.circular(borderRadiusBase.toDouble()),
          //   ),
          // ),
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: 96,
              maxHeight: min(300, MediaQuery.sizeOf(context).height - 200),
              minWidth: width,
              maxWidth: width,
            ),
            child: Column(
              spacing: 0,
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                CommandPaletteTopIndicatorBar(
                  activeCategory:
                      navStack[navStack.length - 1] as CommandPaletteCategory,
                  width: width,
                ),
                CommandPaletteSearchInput(controller: editController),
                activeStackItem.items.isEmpty
                    ? CommandPaletteNoResults()
                    : ListView.builder(
                        itemCount: context
                            .state
                            .commandPaletteState
                            .filteredItems
                            .length,
                        shrinkWrap: true,
                                    padding: EdgeInsets.symmetric(vertical: 8, horizontal: 2),
                        itemBuilder: (BuildContext childContext, int idx) {
                          return CommandPaletteResult(
                            item: context
                                .state
                                .commandPaletteState
                                .filteredItems[idx],
                            idx: idx,
                            pseudoFocused:
                                idx ==
                                context.state.commandPaletteState.selectedIndex,
                          );
                        },
                      ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
