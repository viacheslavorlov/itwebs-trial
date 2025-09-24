import { Product } from "@/app/types/api";
import { fetchProducts } from "@/lib/api";

export const revalidate = 60

export const generateStaticParams = async () => {
    const data = await fetchProducts<Product[]>(`${process.env.API_URL!}/products`, { limit: 10 });
    if (!Array.isArray(data)) return []
    return data.map((item) => ({ id: `${item.id}` }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await fetchProducts<Product>(`${process.env.API_URL!}/products/${id}`)

    return (
        <div>
            Продукт {id}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
