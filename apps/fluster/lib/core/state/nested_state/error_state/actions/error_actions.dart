import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/scaffold/presentation/widgets/desktop/error_page.dart';

class EmitFlusterErrorAction extends FlusterAction {
  final FlusterError error;
  EmitFlusterErrorAction(this.error);

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      errorState: state.errorState.withAppendedError(error),
    );
  }
}
