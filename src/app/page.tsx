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

export default async function HomePage() {
  const data = await api.characters.getAll()

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
          <AutoplayCarousel items={data.data.results} autoplay />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-center justify-center'>
            {/* {data.data.results.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))} */}
          </div>
        </Container>
      </Section>

    </>
  );
}
