// components/ui/typography.tsx

import { type ReactNode, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva('font-sans font-semibold tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl lg:text-5xl',
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-2xl lg:text-3xl',
      h4: 'text-xl lg:text-2xl',
      h5: 'text-lg lg:text-xl',
      h6: 'text-base lg:text-lg',
    },
    margin: {
      default: 'mb-4',
      none: 'mb-0',
    },
  },
  defaultVariants: {
    level: 'h2',
    margin: 'default',
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

export const H = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, as: Component = 'h2', level, margin, children, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={headingVariants({ level, margin, className })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
H.displayName = 'Heading';

const paragraphVariants = cva('font-sans text-muted-foreground', {
  variants: {
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    },
    leading: {
      default: 'leading-7',
      tight: 'leading-tight',
      relaxed: 'leading-relaxed',
    },
    margin: {
      default: 'mb-4',
      none: 'mb-0',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'default',
    leading: 'default',
    margin: 'default',
    align: 'left',
  },
});

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  as?: 'p' | 'div' | 'span';
}

export const P = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    { className, as: Component = 'p', size, leading, margin, align, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={paragraphVariants({
          size,
          leading,
          margin,
          align,
          className,
        })}
        {...props}
      />
    );
  },
);
P.displayName = 'Paragraph';
