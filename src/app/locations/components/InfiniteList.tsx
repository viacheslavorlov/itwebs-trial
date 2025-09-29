'use client'
import { Container } from "@/components/ui/container";
import { H, P } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { Location } from "@/types/api";
import { useState } from "react";
import { List, RowComponentProps } from "react-window";


export const RowComponent = ({
    index,
    items,
    style
}: RowComponentProps<{
    items: Location[];
}>) => (
    <Container style={style} className="mx-auto">

        <H level={'h3'}>{items[index].name}</H>

        <P>{items[index].type}</P>
        <P className="underline">{items[index].dimension}</P>
        <div className="text-foreground text-xs">{`${index + 1} of ${items.length}`}</div>

    </Container>
)


export const InfiniteList = ({ items: initialItems }: { items: Location[] }) => {
    const [allItems, setAllItems] = useState<Location[]>(initialItems)
    const [page, setPage] = useState(2) // первая страница приходит с сервера через initialItems
    const [hasMore, setHasmore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const loadMore = async () => {
        if (!isLoading) {

            setIsLoading(true)
            if (hasMore) {
                setPage(page => page + 1)
                const data = await api.locations.getAll({ page })
                console.log(data);
                if (!data.success || data.data.results.length < 20) {
                    setHasmore(false)

                }
                if (data.success) {
                    setAllItems(prev => [...prev, ...data?.data?.results])
                    if (data.data.results.length < 20) {
                        setAllItems(prev => [...prev, { name: "Конец списка" } as Location])
                    }
                }
            }
            setIsLoading(false)

        }
    }

    return (<>
        <List
            rowComponent={RowComponent}
            className="px-auto mx-auto max-w-[1280px] overflow-hidden"
            rowCount={allItems.length}
            rowHeight={160}
            rowProps={{ items: allItems }}
            onScrollEndCapture={loadMore}
        />
    </>)
}