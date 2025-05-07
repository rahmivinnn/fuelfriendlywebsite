import { toast as sonnerToast, type Toast } from "sonner";

type ToastProps = Omit<Toast, "id" | "title" | "description"> & {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  function toast({ title, description, variant = "default", ...props }: ToastProps) {
    return sonnerToast[variant === "destructive" ? "error" : "success"](title, {
      description,
      ...props,
    });
  }

  return { toast };
}
