import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "theme_settings.freezed.dart";

@freezed
class ThemeSettings with _$ThemeSettings {
    const ThemeSettings._();
    const factory ThemeSettings({
       @Default([FlexScheme.deepBlue]) required FlexScheme  lightTheme,
       @Default([FlexScheme.indigo]) required FlexScheme  darkTheme,
    }) = _ThemeSettings;
}
