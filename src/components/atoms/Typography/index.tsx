import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || 
      (variant === 'h1' ? 'h1' : 
       variant === 'h2' ? 'h2' : 
       variant === 'h3' ? 'h3' : 
       variant === 'h4' ? 'h4' : 
       variant === 'h5' ? 'h5' : 
       variant === 'h6' ? 'h6' : 
       variant === 'blockquote' ? 'blockquote' : 
       variant === 'ul' ? 'ul' : 
       variant === 'ol' ? 'ol' : 'p');

    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
