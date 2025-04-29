import 'dart:math';

import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:flutter/material.dart';

class SetOnboardingIndex extends FlusterAction {
  final int changeInIndex;
  final BuildContext context;
  SetOnboardingIndex(this.changeInIndex, this.context);

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
