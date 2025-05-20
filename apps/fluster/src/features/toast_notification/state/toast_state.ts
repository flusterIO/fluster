import { ShowToast } from "@/lib/bindings";

export type ToastItem = ShowToast;

export interface ToastState {
    toasts: ToastItem[];
}
