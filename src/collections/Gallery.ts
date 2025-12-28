import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    description: 'Manage photo galleries',
    defaultColumns: ['title', 'category', 'imageCount', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Lakes', value: 'lakes' },
        { label: 'Deer Hunting', value: 'deer-hunting' },
        { label: 'Turkey Hunting', value: 'turkey-hunting' },
        { label: 'Fishing', value: 'fishing' },
        { label: 'Property', value: 'property' },
        { label: 'Lodging', value: 'lodging' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Use as gallery cover image',
          },
        },
      ],
    },
    {
      name: 'imageCount',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated',
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return data?.images?.length || 0
          },
        ],
      },
    },
    {
      name: 'showOnPage',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'The Lakes', value: 'the-lakes' },
        { label: 'Deer Hunting', value: 'deer-hunting' },
        { label: 'Turkey Hunting', value: 'turkey-hunting' },
        { label: 'Bass Fishing', value: 'bass-fishing' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Display this gallery on selected pages',
      },
    },
  ],
}
