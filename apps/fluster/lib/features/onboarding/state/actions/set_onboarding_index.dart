import 'dart:math';

import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:flutter/material.dart';

class SetOnboardingIndex extends FlusterAction {
  final int changeInIndex;
  SetOnboardingIndex(this.changeInIndex);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      onboardingState: state.onboardingState.copyWith(
        pageIdx: min(0, state.onboardingState.pageIdx + changeInIndex),
      ),
    );
  }
}

class SetSpecificOnboardingIndex extends FlusterAction {
  final int newIndex;
  SetSpecificOnboardingIndex(this.newIndex);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      onboardingState: state.onboardingState.copyWith(pageIdx: newIndex),
    );
  }
}
