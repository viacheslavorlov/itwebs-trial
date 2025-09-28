import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function LocationsPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page } = await searchParams
    const response = await api.locations.getAll({ page: +page || 1 });
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