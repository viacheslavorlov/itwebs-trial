import { payload } from "@/lib/payload";

export default async function ProductPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ locale: 'ru' | 'en' }> }) {
    const { locale } = await searchParams
    const { id } = await params
    console.log(id);

    const product = await payload.findByID({ collection: 'products', locale, fallbackLocale: 'en', id: id })
    console.log(product);

    return (
        <div>
            {product?.title}
        </div>
    );
}
