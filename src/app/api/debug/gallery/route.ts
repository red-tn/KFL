import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get all gallery images
    const { data: images, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('category')
      .order('display_order')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group by category
    const byCategory: Record<string, typeof images> = {}
    images?.forEach((img) => {
      const cat = img.category || 'uncategorized'
      if (!byCategory[cat]) byCategory[cat] = []
      byCategory[cat].push(img)
    })

    // Count by category
    const counts: Record<string, number> = {}
    Object.keys(byCategory).forEach((cat) => {
      counts[cat] = byCategory[cat].length
    })

    return NextResponse.json({
      total: images?.length || 0,
      counts,
      images: byCategory,
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
