import { CollectionConfig } from "payload";

export const Cta: CollectionConfig = {
    slug: 'ctas',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'label'
    },
    labels: {
        singular: 'Cta',
        plural: 'Ctas',
    },
    fields: [
        {
            name: 'label',
            type: 'text',
        },
        {
            name: "link", // required
            type: "text", // required
            label: "Link",
            required: true,
        },
        {
            name: "title", // required
            type: "text", // required
            label: "CTA title",
            required: false,
        },
        {
            name: "description", // required
            type: "textarea", // required
            label: "CTA desctiption",
            required: false,
        },
        {
            name: "img", // required
            type: "upload", // required
            relationTo: 'media',  //required eg:media
            label: "CTA Image",
            required: false,
        },
    ],

    timestamps: true,
};

