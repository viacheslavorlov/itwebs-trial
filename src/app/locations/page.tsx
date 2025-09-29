import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { InfiniteList } from "./components/InfiniteList";
import { H, P } from "@/components/ui/typography";
import { Aurora } from "@/components/ui/aurora";


export default async function LocationsPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page } = await searchParams
    const response = await api.locations.getAll({ page: +page || 1 });
    console.log(response);
    if ('error' in response || !response) return notFound()

    return (
        <Section className="h-[calc(100vh_-_52px_-_56px_-_56px)] md:h-[calc(100vh_-_56px_-_76px_-_56px)] lg:h-[calc(100vh_-_98px_-_56px)] overflow-visible">
            <Container className="max-h-[560px] overflow-hidden">
                <H level={'h1'} margin={'none'} as="h1" className="text-ce">Все локации {`(${response.data.info.count})`}</H>
                <P>Бесконечный список с автоматической подгрузкой</P>
            </Container>
            <InfiniteList items={response.data.results} />
        </Section >
    );
}