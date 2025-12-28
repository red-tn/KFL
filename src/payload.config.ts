import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { supabaseStorage } from '@payloadcms/storage-supabase'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Activities } from './collections/Activities'
import { Gallery } from './collections/Gallery'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " - King's Family Lakes Admin",
    },
  },
  collections: [Users, Media, Pages, Activities, Gallery],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-min-32-chars-long',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    supabaseStorage({
      collections: {
        media: {
          bucket: 'media',
          prefix: 'kfl',
        },
      },
      bucket: 'media',
      config: {
        serviceKey: process.env.SUPABASE_SERVICE_KEY || '',
        url: process.env.SUPABASE_URL || '',
      },
    }),
  ],
})
