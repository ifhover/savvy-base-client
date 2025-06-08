export type ConfirmIcon = "info" | "success" | "warning" | "error";

export type ConfirmOptions<T = unknown> = {
  icon?: ConfirmIcon;
  title: string;
  content?: string;
  onOk?: () => T | Promise<T>;
  onClose?: (res: T | null) => void;
};
