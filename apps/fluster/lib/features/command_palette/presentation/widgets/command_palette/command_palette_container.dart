import 'package:fluster/core/models/key_press_listener/key_press_listener.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

@immutable
class CommandPalette extends HookWidget {
  final TextEditingController controller = TextEditingController();
  final List<int> selections = [];
  final void Function(bool) setIsOpen;
  final bool isOpen;
  final List<FlusterKeyPressListener> listeners;
  final CommandPaletteCategory initialCategory;
  // final KeyEventResultjV
  CommandPalette({
    super.key,
    required this.setIsOpen,
    required this.isOpen,
    required this.initialCategory,
    required this.listeners,
  });

  @override
  Widget build(BuildContext context) {
    final brightness = Theme.brightnessOf(context);
    final hasAnimated = useState(false);
    useEffect(() {
      hasAnimated.value = true;
      return () {};
    }, []);
    return GestureDetector(
      onTap: () {
        setIsOpen(false);
      },
      child: AnimatedContainer(
        padding: const EdgeInsets.symmetric(vertical: 64, horizontal: 64),
        decoration: BoxDecoration(
          color: hasAnimated.value
              ? Colors.black.withValues(
                  alpha: brightness == Brightness.dark ? 0.7 : 0.2,
                )
              : Colors.transparent,
        ),
        duration: const Duration(milliseconds: 3000),
        curve: Curves.easeOut,
        child: CommandPaletteWidget(
          listeners: listeners,
        ),
      ),
    );
  }
}
