import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductSPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page } = await searchParams
    const response = await api.products.getAll({ page: +page || 1, limit: 4 });
    console.log(response);
    if ('error' in response || !response.data) return notFound()

    return (
        <Section>
            <Container>
                Всего продуктов {response?.pagination?.total}
                <br />
                {Math.round(Math.random() * 100)}
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </Container>
        </Section>
    );
}