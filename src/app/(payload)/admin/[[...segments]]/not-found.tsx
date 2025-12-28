/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { importMap } from './importMap.js'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> =>
  generatePageMetadata({ config, params: Promise.resolve({ segments: ['not-found'] }), searchParams: Promise.resolve({}) })

const NotFound = () => NotFoundPage({ config, importMap })

export default NotFound
