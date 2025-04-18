import 'package:fluster/widgets/scaffolds/desktop/error_page.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "error_state.freezed.dart";

@freezed
class GlobalErrorState with _$GlobalErrorState {
    const GlobalErrorState._();
    const factory GlobalErrorState({
        @Default([]) List<FlusterError> errors,
    }) = _GlobalErrorState;
    static GlobalErrorState initialState() => GlobalErrorState(errors: []);

    GlobalErrorState withAppendedError(FlusterError error) {
        return copyWith(errors: [...errors, error]);
    }
}
