import img from '@/app/assets/hero-2.jpg';
import bgImage from '@/app/assets/hero.jpg';
import { CharacterCard } from '@/components/character/character-card';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ArrowRight, Phone } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import classes from './home.module.css';
import { AutoplayCarousel } from '@/components/ui/autoplay-carousel';
import { Aurora } from '@/components/ui/aurora';
import { H, P } from '@/components/ui/typography';

export default async function HomePage() {
  const data = await api.characters.getAll()
  console.log('data', data);

  if (!data.success) return notFound()

  return (
    <>
      <Section className='h-[calc(100vh_-_92px)] overflow-hidden relative'>
        <Image
          src={bgImage.src}
          alt="blur"
          width={1200}
          height={840}
          className={cn("absolute scale-110 top-0 bottom-0 left-0 right-0 w-full h-full -z-10 object-cover", classes.img)}
        />
        <Container>
          <Aurora />

          <Hero
            title={"Тест для ITWEBS"}
            description={"Статически сгенерированная страница"}
            primaryButton={{
              text: 'К локациям',
              href: '/locations',
              icon: <ArrowRight />,
            }}
            secondaryButton={{
              text: 'Связаться с нами',
              href: '/contacts',
              icon: <Phone />,
            }}
            image={{
              src: img.src,
              width: img.width,
              height: img.height,
              alt: '',
            }}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <H>Кастомизированная карусель shadcn/ui</H>
          <P>Добавлены точки навигации, автоплей или автоскрол на выбор</P>
          <AutoplayCarousel items={data.data.results} autoplay dots={{ enabled: true }} />
        </Container>
      </Section>

    </>
  );
}
