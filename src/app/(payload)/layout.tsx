/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

export default function Layout({ children }: Args) {
  return <RootLayout config={config}>{children}</RootLayout>
}
