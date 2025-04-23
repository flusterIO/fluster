import 'dart:math';

import 'package:fluster/core/extension_methods/context_extension.dart';
import 'package:fluster/core/models/key_press_listener/key_press_listener.dart';
import 'package:fluster/core/static/constants/static_constants.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/command_palette_root.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_no_results.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_search_input.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette_top_indicator_bar.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_pallete_search_result.dart';
import 'package:fluster/features/settings/data/models/setting_pages.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CommandPaletteWidget extends HookWidget {
  final List<CommandPaletteCategory> initialNavStack;
  final List<FlusterKeyPressListener> listeners;

  KeyEventResult handleKeyPress(FocusNode node, KeyEvent event, SearchController controller, KeymapSettingPageData settingData) {
    // for (var k in listeners) {
    //   k.listener(node, event);
    // }
    if (controller.text == "" && true) {}
    return KeyEventResult.ignored;
  }

  const CommandPaletteWidget({
    super.key,
    required this.listeners,
    this.initialNavStack = const [CommandPaletteRoot()],
  });

  @override
  Widget build(BuildContext context) {
    final navStack = useState<List<CommandPaletteEntry>>(initialNavStack);
    final size = MediaQuery.sizeOf(context);
    final focusScope = useFocusScopeNode();
    final searchController = useSearchController();
    focusScope.onKeyEvent = (FocusNode n, KeyEvent e) => handleKeyPress(n, e, searchController, context.state.settingsState.settings.pages[SettingPageId.keymap] as KeymapSettingPageData);
    final width = min(size.width - 80, 768).toDouble();
    final theme = Theme.of(context);
    final activeStackItem = navStack.value[navStack.value.length - 1];
    return FocusScope(
      node: focusScope,
      autofocus: true,
      descendantsAreFocusable: true,
      child: Center(
        child: Container(
          width: width,
          decoration: BoxDecoration(
            border: Border.all(width: 1, color: theme.dividerColor),
            color: theme.cardColor,
            borderRadius: BorderRadius.all(
              Radius.circular(borderRadiusBase.toDouble()),
            ),
          ),
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
                      navStack.value[navStack.value.length - 1]
                          as CommandPaletteCategory,
                  width: width,
                ),
                CommandPaletteSearchInput(controller: searchController),
                // CommandPaletteResults(items: items, controller: scrollController),
                activeStackItem.items.isEmpty
                    ? CommandPaletteNoResults()
                    : ListView.builder(
                        itemCount: activeStackItem.items.length,
                        shrinkWrap: true,
                        itemBuilder: (BuildContext childContext, int idx) {
                          return CommandPaletteResult(
                            item: activeStackItem.items[idx],
                            idx: idx,
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
