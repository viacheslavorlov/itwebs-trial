import { breakpoints } from "@/lib/utils";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        livePreview: {
            url: ({ data, req, locale, collectionConfig }) => {
                return `${req.protocol}//${req.host}/${collectionConfig?.slug || ''}/${data.id}${locale ? `?locale=${locale?.code}` : ''}`
            },
            breakpoints
        },
    },

    labels: {
        singular: 'Product',
        plural: 'Products',
    },
    fields: [
        //example text field
        {
            localized: true,
            name: 'title',
            type: 'text',
        },
    ],
};

