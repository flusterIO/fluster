import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/state/network/network_state.dart';
import 'package:fluster/types/state_types.dart';

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
          loadingSources:
              source == null
                  ? state.networkState.loadingSources
                  : [...state.networkState.loadingSources, source!],
        ),
        settingsState: state.settingsState.copyWith(hasSeeded: hasSeeded),
      );
    } else {
      // is not loading. DOn't directly set loading here, and leave that to the length of the array so specific types of loading states can be removed individually.
      if (source != null) {
        return state.copyWith(
          networkState: state.networkState.copyWith(
            loadingSources:
                state.networkState.loadingSources
                    .where((x) => x != source!)
                    .toList(),
          ),
          settingsState: state.settingsState.copyWith(hasSeeded: hasSeeded),
        );
      }
    }
    return state;
  }
}
