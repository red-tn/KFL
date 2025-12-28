import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site settings and contact information',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: "King's Family Lakes",
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Premier Hunting & Fishing in Alabama',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              defaultValue: '+1 (334) 341-3753',
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              defaultValue: 'papakingj@gmail.com',
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  defaultValue: 'Epes',
                },
                {
                  name: 'state',
                  type: 'text',
                  defaultValue: 'Alabama',
                },
                {
                  name: 'directions',
                  type: 'textarea',
                  defaultValue: 'I-20, Exit 23',
                },
              ],
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              defaultValue: 'https://facebook.com/kingsfamilylakes',
            },
            {
              name: 'instagram',
              type: 'text',
            },
            {
              name: 'youtube',
              type: 'text',
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'huntingDailyRate',
              type: 'number',
              defaultValue: 300,
              admin: {
                description: 'Daily rate for hunting ($/day)',
              },
            },
            {
              name: 'lodgingNightlyRate',
              type: 'number',
              defaultValue: 100,
              admin: {
                description: 'Nightly rate for lodging ($/night)',
              },
            },
            {
              name: 'trophyFee',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Trophy fee (usually $0)',
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
          label: 'Ads & Analytics',
          fields: [
            {
              name: 'googleAdsenseId',
              type: 'text',
              admin: {
                description: 'Google AdSense Publisher ID (ca-pub-xxxxx)',
              },
            },
            {
              name: 'googleAnalyticsId',
              type: 'text',
              admin: {
                description: 'Google Analytics Measurement ID',
              },
            },
            {
              name: 'adSlots',
              type: 'group',
              admin: {
                description: 'Ad slot IDs for different positions',
              },
              fields: [
                { name: 'heroBottom', type: 'text', label: 'Hero Bottom Slot' },
                { name: 'contentMiddle', type: 'text', label: 'Content Middle Slot' },
                { name: 'preFooter', type: 'text', label: 'Pre-Footer Slot' },
                { name: 'sidebar', type: 'text', label: 'Sidebar Slot' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              defaultValue: "King's Family Lakes | Hunting & Fishing in Alabama",
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              defaultValue: "Experience world-class deer hunting, turkey hunting, and bass fishing at King's Family Lakes in Alabama.",
            },
            {
              name: 'keywords',
              type: 'text',
              defaultValue: 'Alabama hunting, deer hunting, turkey hunting, bass fishing, private hunting land',
            },
          ],
        },
      ],
    },
  ],
}
