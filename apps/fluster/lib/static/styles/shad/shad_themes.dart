import 'package:flutter/material.dart';

class ShadTheme extends ThemeExtension<ShadTheme> {
  const ShadTheme({
    required this.popover,
    required this.popoverForeground,
    required this.card,
    required this.cardForeground,
    required this.primary,
    required this.primaryForeground,
    required this.secondary,
    required this.secondaryForeground,
    required this.muted,
    required this.mutedForeground,
    required this.border,
    required this.destructive,
    required this.destructiveForeground,
    required this.input,
    required this.ring,
    required this.background,
    required this.foreground,
    required this.borderRadius,
  });

  final Color popover;
  final Color popoverForeground;
  final Color card;
  final Color cardForeground;
  final Color primary;
  final Color primaryForeground;
  final Color secondary;
  final Color secondaryForeground;
  final Color muted;
  final Color mutedForeground;
  final Color border;
  final Color destructive;
  final Color destructiveForeground;
  final Color input;
  final Color ring;
  final Color background;
  final Color foreground;
  final double borderRadius;

  @override
  ThemeExtension<ShadTheme> copyWith({
    Color? popover,
    Color? popoverForeground,
    Color? card,
    Color? cardForeground,
    Color? primary,
    Color? primaryForeground,
    Color? secondary,
    Color? secondaryForeground,
    Color? muted,
    Color? mutedForeground,
    Color? border,
    Color? destructive,
    Color? destructiveForeground,
    Color? input,
    Color? ring,
    Color? background,
    Color? foreground,
    double? borderRadius,
  }) {
    return ShadTheme(
      popover: popover ?? this.popover,
      popoverForeground: popoverForeground ?? this.popoverForeground,
      card: card ?? this.card,
      cardForeground: cardForeground ?? this.cardForeground,
      primary: primary ?? this.primary,
      primaryForeground: primaryForeground ?? this.primaryForeground,
      secondary: secondary ?? this.secondary,
      secondaryForeground: secondaryForeground ?? this.secondaryForeground,
      muted: muted ?? this.muted,
      mutedForeground: mutedForeground ?? this.mutedForeground,
      border: border ?? this.border,
      destructive: destructive ?? this.destructive,
      destructiveForeground:
          destructiveForeground ?? this.destructiveForeground,
      input: input ?? this.input,
      ring: ring ?? this.ring,
      background: background ?? this.background,
      foreground: foreground ?? this.foreground,
      borderRadius: borderRadius ?? this.borderRadius,
    );
  }

  @override
  ThemeExtension<ShadTheme> lerp(
    covariant ThemeExtension<ShadTheme>? other,
    double t,
  ) {
    if (other is! ShadTheme) {
      return this;
    }
    return ShadTheme(
      popover: Color.lerp(popover, other.popover, t) as Color,
      popoverForeground:
          Color.lerp(popoverForeground, other.popoverForeground, t) as Color,
      card: Color.lerp(card, other.card, t) as Color,
      cardForeground:
          Color.lerp(cardForeground, other.cardForeground, t) as Color,
      primary: Color.lerp(primary, other.primary, t) as Color,
      primaryForeground:
          Color.lerp(primaryForeground, other.primaryForeground, t) as Color,
      secondary: Color.lerp(secondary, other.secondary, t) as Color,
      secondaryForeground:
          Color.lerp(secondaryForeground, other.secondaryForeground, t)
              as Color,
      muted: Color.lerp(muted, other.muted, t) as Color,
      mutedForeground:
          Color.lerp(mutedForeground, other.mutedForeground, t) as Color,
      border: Color.lerp(border, other.border, t) as Color,
      destructive: Color.lerp(destructive, other.destructive, t) as Color,
      destructiveForeground:
          Color.lerp(destructiveForeground, other.destructiveForeground, t)
              as Color,
      input: Color.lerp(input, other.input, t) as Color,
      ring: Color.lerp(ring, other.ring, t) as Color,
      background: Color.lerp(background, other.background, t) as Color,
      foreground: Color.lerp(foreground, other.foreground, t) as Color,
      borderRadius: 8.0,
    );
  }
}
