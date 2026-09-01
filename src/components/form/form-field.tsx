import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor: string;
  error?: string;
  description?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { className, label, htmlFor, error, description, children, ...props },
    ref,
  ) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      <Label
        htmlFor={htmlFor}
        className="text-base font-normal text-foreground"
      >
        {label}
      </Label>
      {children}
      {description && !error && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  ),
);

FormField.displayName = "FormField";

export { FormField };
