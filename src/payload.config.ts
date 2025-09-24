import path from 'node:path';
import { fileURLToPath } from 'node:url';
// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { searchPlugin } from '@payloadcms/plugin-search';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Cta } from './collections/Cta';
import { Home } from './collections/Home';
import { Media } from './collections/Media';
import { Products } from './collections/Products';
import { Users } from './collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const config = buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: process.env.NODE_ENV === 'development' ? {
      email: process.env.DEFAULT_USER,
      password: process.env.DEFAULT_PASS,
    } : false,
    livePreview: {
      url: ({ data, req, locale, globalConfig, collectionConfig }) => {
        if (globalConfig) {
          return `${req.protocol}//${req.host}/${data?.slug || ''}${locale ? `?locale=${locale?.code}` : ''}`
        }
        return `${req.protocol}//${req.host}/${data?.slug || ''}/${data.id}${locale ? `?locale=${locale?.code}` : ''}`
      },
      // url: ({ data, collectionConfig, globalConfig, locale }) => {
      // if (collectionConfig) {

      //   return `${data.tenant.url}${collectionConfig?.slug === 'posts'
      //     ? `/posts/${data.slug}`
      //     : `${data.slug !== 'home' ? `/${data.slug}` : ''}`
      //     }${locale ? `?locale=${locale?.code}` : ''}` // Localization query param
      // }
      //   console.log(`${data.tenant.url}${globalConfig?.slug}/${data.slug}${locale ? `?locale=${locale?.code}` : ''}`);

      //   return `${data.tenant.url}${globalConfig?.slug}/${data.slug}${locale ? `?locale=${locale?.code}` : ''}` // Localization query param
      // },

      collections: ['products'],
      globals: ['home'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  localization: {
    defaultLocale: 'ru',
    locales: ['ru', 'en']
  },
  telemetry: false,
  defaultDepth: 2,
  cors: { origins: [process.env.CORS_DOMAIN as string] }, //add another domains as needed
  csrf: [process.env.CORS_DOMAIN as string], //add another domains as needed
  globals: [Home],
  collections: [Users, Media, Cta, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER as string,
    defaultFromName: process.env.SMTP_USER as string,
    // Any Nodemailer transport
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      // collections: [
      //   'Media',
      // ],
      globals: ['home'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.descrioption,
    }),
    searchPlugin({
      collections: [],
      defaultPriorities: {
        pages: 10,
        posts: 20,
      },
    }),
  ],
});
export default config