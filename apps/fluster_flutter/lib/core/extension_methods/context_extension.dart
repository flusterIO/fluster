import 'package:async_redux/async_redux.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:flutter/widgets.dart';

extension BuildContextExtension on BuildContext {
  GlobalAppState get state => getState<GlobalAppState>();
}
