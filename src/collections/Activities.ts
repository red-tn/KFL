import { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'name',
    description: 'Manage hunting and fishing activities',
    defaultColumns: ['name', 'type', 'dailyRate', 'featured'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Lake', value: 'lake' },
        { label: 'Deer Hunting', value: 'deer-hunting' },
        { label: 'Turkey Hunting', value: 'turkey-hunting' },
        { label: 'Bass Fishing', value: 'bass-fishing' },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description for cards and previews',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      admin: {
        description: 'Full activity description',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'dailyRate',
          type: 'number',
          admin: {
            description: 'Price per day in dollars',
          },
        },
        {
          name: 'lodgingRate',
          type: 'number',
          admin: {
            description: 'Lodging price per night',
          },
        },
        {
          name: 'pricingNotes',
          type: 'textarea',
          admin: {
            description: 'Additional pricing information',
          },
        },
      ],
    },
    {
      name: 'season',
      type: 'group',
      admin: {
        description: 'Hunting/fishing season dates',
      },
      fields: [
        {
          name: 'fallStart',
          type: 'text',
          admin: {
            description: 'Fall season start (e.g., "November 23")',
          },
        },
        {
          name: 'fallEnd',
          type: 'text',
          admin: {
            description: 'Fall season end',
          },
        },
        {
          name: 'springStart',
          type: 'text',
          admin: {
            description: 'Spring season start',
          },
        },
        {
          name: 'springEnd',
          type: 'text',
          admin: {
            description: 'Spring season end',
          },
        },
        {
          name: 'yearRound',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Available year-round (e.g., fishing)',
          },
        },
      ],
    },
    {
      name: 'regulations',
      type: 'array',
      admin: {
        description: 'Hunting/fishing regulations',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Features and amenities',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (lower = first)',
      },
    },
  ],
}
