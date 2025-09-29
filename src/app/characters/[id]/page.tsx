import { Character } from "@/types/api";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const revalidate = 60

export const generateStaticParams = async () => {
    const data = await api.characters.getAll()
    if (!Array.isArray(data)) return []
    return data.map((item) => ({ id: `${item.id}` }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) return notFound()
    const data = await api.characters.getById(+id)

    return (
        <Section>
            <Container>

                Character {id}
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </Container>
        </Section>
    );
}
