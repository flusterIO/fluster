import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;

part "database_state.freezed.dart";

enum DatabaseStatus { notInitialized, notConnected, connected }

@freezed
class DatabaseState with _$DatabaseState {
  const DatabaseState._();
  const factory DatabaseState({
    /// Use this key to onboard the user, and use this time to iinitialize the database.
    required native.FlusterDatabaseStatus status,
    // required FocusIndices layoutDimensions,
  }) = _DatabaseState;

  static DatabaseState initialState() =>
      DatabaseState(status: native.FlusterDatabaseStatus.awaitingInitialPing);

  DatabaseState withSettingsPageReset() => DatabaseState.initialState();
}
