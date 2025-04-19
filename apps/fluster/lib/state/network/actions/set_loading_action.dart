import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/state/network/network_state.dart';
import 'package:fluster/types/state_types.dart';

class SetLoadingAction extends FlusterAction {
  final LoadingSource? source;
  final bool isLoading;
  SetLoadingAction(this.isLoading, this.source);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      networkState: state.networkState.copyWith(
        loading: isLoading,
        loadingSources:
            source == null
                ? state.networkState.loadingSources
                : isLoading
                ? state.networkState.loadingSources.withAppendedLoadingSource(
                  source,
                )
                : state.networkState.loadingSources.withLoadingSourceRemoved(
                  source,
                ),
      ),
    );
  }
}
