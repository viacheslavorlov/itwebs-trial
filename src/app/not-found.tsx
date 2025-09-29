import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { H, P } from '@/components/ui/typography'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Section>
            <Container className='flex flex-col items-center justify-center gap-4'>
                <H>Ошибка 404</H>
                <P>Ресурс не найден</P>
                <Button><Link href="/">Вернуться на главную</Link></Button>
            </Container>
        </Section>
    )
}