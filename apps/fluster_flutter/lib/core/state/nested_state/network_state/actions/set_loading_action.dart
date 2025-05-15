import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/state/nested_state/network_state/network_state.dart';
import 'package:fluster/core/types/state_types.dart';

class SetLoadingAction extends FlusterAction {
  final LoadingSource? source;
  final bool isLoading;
  SetLoadingAction(this.isLoading, this.source);

  @override
  GlobalAppState reduce() {
    final hasSeeded =
        (isLoading == false) && (source == LoadingSource.databaseSettings)
        ? true
        : state.settingsState.hasSeeded;
    if (isLoading) {
      return state.copyWith(
        networkState: state.networkState.copyWith(
          loading: true,
          loadingSources: source == null
              ? state.networkState.loadingSources
              : [...state.networkState.loadingSources, source!],
        ),
        settingsState: state.settingsState.copyWith(hasSeeded: hasSeeded),
      );
    } else {
      // is not loading. DOn't directly set loading here, and leave that to the length of the array so specific types of loading states can be removed individually.
      if (source != null) {
        final loadingSources = state.networkState.loadingSources
            .where((x) => x != source!)
            .toList();
        return state.copyWith(
          networkState: state.networkState.copyWith(
            loadingSources: loadingSources,
            loading: loadingSources.isNotEmpty,
          ),
          settingsState: state.settingsState.copyWith(hasSeeded: hasSeeded),
        );
      }
    }
    return state;
  }
}
