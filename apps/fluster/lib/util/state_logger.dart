import 'dart:developer';

import 'package:async_redux/async_redux.dart';
import 'package:fluster/state/global/global_state.dart';

class DevelopmentStateLogger extends ActionObserver<GlobalAppState> {
  DevelopmentStateLogger();

  @override
  void observe(ReduxAction action, int dispatchCount, {required bool ini}) {
    log("$action");
  }
}
