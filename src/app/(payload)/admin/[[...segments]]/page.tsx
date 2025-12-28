/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  return {
    title: "Admin | King's Family Lakes",
  }
}

export default async function Page({ params, searchParams }: Args) {
  return <RootPage config={config} params={params} searchParams={searchParams} />
}
