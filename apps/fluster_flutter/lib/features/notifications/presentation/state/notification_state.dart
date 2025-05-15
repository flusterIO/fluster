
import 'package:fluster/features/notifications/data/models/toast.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part "notification_state.freezed.dart";

@freezed
class GlobalNotificationState with _$GlobalNotificationState {
    const GlobalNotificationState._();
    const factory GlobalNotificationState({ 
        @Default([]) List<ToastNotificationItem> toasts,
    }) = _GlobalNotificationState;

    GlobalNotificationState withRemoveToastById(String toastId) => copyWith(toasts: toasts.where((x) => x.id != toastId).toList());

    static GlobalNotificationState initialState() => GlobalNotificationState(toasts: []);
}
