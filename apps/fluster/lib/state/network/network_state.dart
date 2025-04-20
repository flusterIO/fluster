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
      copyWith(
        loadingSources: [...loadingSources, loadingSource],
        loading: true,
      );

  NetworkState withLoadingSourceRemoved(LoadingSource loadingSource) {
    final x = loadingSources.where((x) => x != loadingSource).toList();
    return copyWith(loadingSources: x, loading: x.isNotEmpty);
  }
}
