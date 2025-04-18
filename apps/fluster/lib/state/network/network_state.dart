import 'package:freezed_annotation/freezed_annotation.dart';

part "network_state.freezed.dart";

enum LoadingSource { remoteMdx, localMdx, databaseSettings }

@freezed
class NetworkState with _$NetworkState {
  const factory NetworkState({
    @Default(true) loading,
    @Default([]) loadingSources,
  }) = _NetworkState;
  static NetworkState initialState() => NetworkState(
    loading: true,
    loadingSources: [LoadingSource.databaseSettings],
  );
  // NetworkState withAppendedLoadingSource(LoadingSource loadingSource) => this.copyWith( loadingSources: loadingSources.)
}
