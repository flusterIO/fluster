import "package:fluster/widgets/interaction/commandPalette/command_palette_item.dart";
import "package:fluster/widgets/interaction/commandPalette/command_palette_options.dart";
import "package:fluster/widgets/interaction/commandPalette/command_palette_search_input.dart";
import "package:flutter_test/flutter_test.dart";

// RESUME: Come back here and handle the rest of this test according to docs.
void main() {
  late CommandPaletteItem sut;

  setUp(() {
    sut = getCommandPaletteRootOption();
  });
  group("CommandPaletteItem", () {
    test("Filters", () {
      // Arrange
      // Act

      // Assert
      expect(sut.category, CommandPaletteCategory.root);
    });
  });
}
