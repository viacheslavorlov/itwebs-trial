import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ArrowRight } from 'lucide-react';
import img from './image.png';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { payload } from '@/lib/payload';


export default async function HomePage() {
  // const data = await payload.findGlobal({ slug: 'home' })
  const { isEnabled: isDraftMode } = await draftMode()

  const data = await payload.findGlobal({
    slug: 'home',
    depth: 0,
    draft: isDraftMode,
    overrideAccess: isDraftMode,

  })

  if (data === null) {
    return notFound()
  }

  return (
    <Section>
      <Container>
        <Hero
          title={data.title}
          description={data.description}
          primaryButton={{
            text: 'Get Started',
            href: '/#',
            icon: <ArrowRight />,
          }}
          image={{
            src: img.src,
            width: img.width,
            height: img.height,
            alt: 'Welcome to Payload CMS',
          }}
        />
      </Container>
    </Section>
  );
}
