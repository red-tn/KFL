import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Upload and manage images for the site',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: '../public/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption to display with the image',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Lakes', value: 'lakes' },
        { label: 'Deer Hunting', value: 'deer-hunting' },
        { label: 'Turkey Hunting', value: 'turkey-hunting' },
        { label: 'Fishing', value: 'fishing' },
        { label: 'Property', value: 'property' },
        { label: 'Lodging', value: 'lodging' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        description: 'Categorize for easier organization',
      },
    },
  ],
}
