import img from '@/app/assets/hero-2.jpg';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ArrowRight, Phone } from 'lucide-react';
import bgImage from '@/app/assets/hero.jpg';
import Image from 'next/image';
import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import classes from './home.module.css'

export default async function HomePage() {
  const data = await api.products.getAll({ limit: 2 });

  if ('error' in data) return notFound()

  return (<>
    <Section className='h-[calc(100vh_-_92px)] overflow-hidden relative'>
      <Image
        src={bgImage.src}
        alt="blur"
        width={1200}
        height={840}
        className={cn("absolute scale-110 top-0 bottom-0 left-0 right-0 w-full h-full -z-10 object-cover", classes.img)}
      />
      <Container>
        <Hero
          title={"Тест для ITWEBS"}
          description={"Посмотрите на странную желтую штуку"}
          primaryButton={{
            text: 'К товарам',
            href: '/products',
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </Section>

  </>
  );
}
