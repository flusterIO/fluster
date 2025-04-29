import 'dart:async';
import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';

class PingDatabaseStatus extends FlusterAction {
  PingDatabaseStatus();

  @override
  Future<GlobalAppState> reduce() async {
    final status = await native.getDatabaseStatus();
    return state.copyWith(
      databaseState: state.databaseState.copyWith(status: status),
    );
  }
}
