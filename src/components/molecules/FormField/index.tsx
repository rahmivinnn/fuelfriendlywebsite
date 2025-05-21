import React from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/atoms/Typography';

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, htmlFor, error, hint, className, children, required, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)} ref={ref} {...props}>
        {label && (
          <label htmlFor={htmlFor} className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        {children}
        {hint && !error && (
          <Typography variant="muted" className="text-xs">{hint}</Typography>
        )}
        {error && (
          <Typography variant="muted" className="text-xs text-destructive">{error}</Typography>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
