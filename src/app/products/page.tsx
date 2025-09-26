import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductSPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page } = await searchParams
    const response = await api.photos.getAll({ _page: +page || 1, _limit: 4 });
    console.log(response);
    if ('error' in response || !response) return notFound()

    return (
        <Section>
            <Container>
                Все товары
                <br />
                {Math.round(Math.random() * 100)}
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </Container>
        </Section>
    );
}