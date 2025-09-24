import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  yPadding?: string;
  className?: string;
  as?: 'section' | 'div' | 'header' | 'footer';
}

export const Section = ({
  children,
  yPadding = 'py-8 md:py-12 lg:py-16',
  className = '',
  as: Component = 'section',
}: SectionProps) => {
  return (
    <Component className={`w-full ${yPadding} ${className}`}>
      {children}
    </Component>
  );
};
