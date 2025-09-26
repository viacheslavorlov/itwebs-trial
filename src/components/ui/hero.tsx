import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from './button';
import { H, P } from './typography';

interface HeroProps {
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  secondaryButton?: {
    text: string;
    href: string;
    icon?: ReactNode;

  };
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
  variant?: 'default' | 'reversed';
}

export function Hero({
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  return (
    <div className="flex flex-col justify-between h-full  max-w-screen-xl py-8 mx-auto gap-8 lg:py-16 ">
      <div
        className={
          `flex flex-col justify-center gap-4 lg:mr-auto bg-background/15 backdrop-blur-lg p-6 md:p-8 lg:p-10 rounded-3xl w-full h-full border border-accent/50 lg:w-1/2 animate-appear`
        }
      >
        <H level="h1" className="text-primary-foreground mb-4 w-full">
          {title}
        </H>

        <P margin={'default'} size={'lg'} className="text-primary-foreground">
          {description}
        </P>

        <div className="flex flex-wrap gap-4">
          {primaryButton && (
            <Button size={'lg'} asChild variant={'default'} className='w-full lg:w-auto'>
              <Link href={primaryButton.href} className="">
                {primaryButton.text}
                {primaryButton.icon && (
                  <span className="">{primaryButton.icon}</span>
                )}
              </Link>
            </Button>
          )}

          {secondaryButton && (
            <Button size={'lg'} asChild variant={'secondary'} className='w-full lg:w-auto'>
              <Link href={secondaryButton.href} className="">
                {secondaryButton.text}
                {secondaryButton.icon && (
                  <span className="">{secondaryButton.icon}</span>
                )}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
