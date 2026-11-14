import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Alert({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      className={cn("rounded-xl border border-primary/20 bg-secondary px-4 py-3 text-sm text-foreground", className)}
      {...props}
    />
  );
}
