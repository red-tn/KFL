import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST - Reorder gallery images
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { images } = body // Array of { id, display_order }

    if (!images || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Images array is required' }, { status: 400 })
    }

    // Update each image's display_order
    const updates = images.map((img: { id: string; display_order: number }) =>
      supabase
        .from('gallery_images')
        .update({ display_order: img.display_order })
        .eq('id', img.id)
    )

    await Promise.all(updates)

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to reorder images' }, { status: 500 })
  }
}
