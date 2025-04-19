import 'package:freezed_annotation/freezed_annotation.dart';

part "network_state.freezed.dart";

enum LoadingSource { remoteMdx, localMdx, databaseSettings }

@freezed
class NetworkState with _$NetworkState {
  const NetworkState._();
  const factory NetworkState({
    @Default(true) bool loading,
    @Default([]) List<LoadingSource> loadingSources,
  }) = _NetworkState;
  static NetworkState initialState() => NetworkState(
    loading: true,
    loadingSources: [LoadingSource.databaseSettings],
  );
  NetworkState withAppendedLoadingSource(LoadingSource loadingSource) =>
      copyWith(loadingSources: [...loadingSources, loadingSource]);

  NetworkState withLoadingSourceRemoved(LoadingSource loadingSource) =>
      copyWith(loadingSources: loadingSources.where((x) => x != loadingSource));
}
