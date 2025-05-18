export enum ToastVariant {
  error,
  info,
  success,
}

export interface ToastItem {
  expires: number;
  title: string;
  desc: string;
  variant: ToastVariant;
  id: string;
}

export interface ToastState {
  toasts: ToastItem[];
}
