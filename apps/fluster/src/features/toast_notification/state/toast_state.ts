enum ToastVariant {
  error,
  info,
  success,
}

interface ToastItem {
  expires: number;
  title: string;
  desc: string;
  variant: ToastVariant;
  id: string;
}

interface ToastState {
  toasts: ToastItem[];
}
