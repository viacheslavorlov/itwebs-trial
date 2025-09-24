// components/sections/Hero.tsx

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { H, P } from './typography';
import { Section } from './section';
import { Container } from './container';
import { Button } from './button';

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
  image,
  className = '',
  variant = 'default',
}: HeroProps) {
  return (
    <Section className={`bg-background ${className}`}>
      <Container className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div
          className={`mr-auto place-self-center lg:col-span-7 ${
            variant === 'reversed' ? 'lg:order-last' : ''
          }`}
        >
          <H level="h1" className="">
            {title}
          </H>

          <P size={'lg'} className="">
            {description}
          </P>

          <div className="flex flex-wrap gap-4">
            {primaryButton && (
              <Button asChild variant={'default'}>
                <Link href={primaryButton.href} className="">
                  {primaryButton.text}
                  {primaryButton.icon && (
                    <span className="">{primaryButton.icon}</span>
                  )}
                </Link>
              </Button>
            )}

            {secondaryButton && (
              <Button asChild variant={'secondary'}>
                <Link href={secondaryButton.href} className="">
                  {secondaryButton.text}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {image && (
          <div
            className={`hidden lg:mt-0 lg:col-span-5 lg:flex ${
              variant === 'reversed' ? 'lg:order-first' : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              height={image.height}
              width={image.width}
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
