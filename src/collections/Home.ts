import type { GlobalConfig } from 'payload';

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  admin: {
    // preview: () => {
    //   const encodedParams = new URLSearchParams({
    //     slug: 'home',
    //     collection: '',
    //     path: '/',
    //     previewSecret: process.env.PREVIEW_SECRET || '',
    //   })
    //   return '/'
    //   // return `/preview?${encodedParams.toString()}`
    // },
    // livePreview
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'cta',
      type: 'relationship',
      relationTo: 'ctas'
    },
    {
      name: 'projectsTitle',
      type: 'text',
      label: "Заголовок проектов"
    },
    //проекты relation field
    {
      name: "workTitle", // required
      type: "text", // required
      label: "Заголовок места работы",
      required: false,
    },
    // work place rel field
  ],
};
