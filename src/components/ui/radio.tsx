import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id={inputId}
          ref={ref}
          className={cn(
            "h-4 w-4 border-(--border-default) text-(--brand-primary) accent-(--brand-primary)",
            "focus:ring-2 focus:ring-(--brand-secondary) focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className="text-body-small text-(--text-secondary) cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    );
  }
);
Radio.displayName = "Radio";
