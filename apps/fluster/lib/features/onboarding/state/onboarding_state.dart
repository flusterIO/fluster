import 'package:freezed_annotation/freezed_annotation.dart';

part "onboarding_state.freezed.dart";

const maxOnboardingIndex = 5;

@freezed
class OnboardingState with _$OnboardingState {
  const OnboardingState._();
  const factory OnboardingState({
    /// This key is used to navigate within the settings page.
    required int pageIdx,
    // required FocusIndices layoutDimensions,
  }) = _OnboardingState;

  static OnboardingState initialState() => OnboardingState(pageIdx: 0);

  OnboardingState withSettingsPageReset() => OnboardingState.initialState();
}
