import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch all gallery images
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('category')
      .order('display_order', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ images: data || [] })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}

// POST - Add new gallery image
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { title, image_url, category, caption, display_order } = body

    if (!image_url) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Get max display_order for this category
    const { data: maxOrderData } = await supabase
      .from('gallery_images')
      .select('display_order')
      .eq('category', category || 'main-gallery')
      .order('display_order', { ascending: false })
      .limit(1)

    const newOrder = display_order ?? ((maxOrderData?.[0]?.display_order ?? 0) + 1)

    const { data, error } = await supabase
      .from('gallery_images')
      .insert({
        title,
        image_url,
        category: category || 'main-gallery',
        caption,
        display_order: newOrder,
        is_featured: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ image: data })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 })
  }
}

// PUT - Update gallery image
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { id, title, image_url, category, caption, display_order, is_featured } = body

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (image_url !== undefined) updateData.image_url = image_url
    if (category !== undefined) updateData.category = category
    if (caption !== undefined) updateData.caption = caption
    if (display_order !== undefined) updateData.display_order = display_order
    if (is_featured !== undefined) updateData.is_featured = is_featured

    const { data, error } = await supabase
      .from('gallery_images')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ image: data })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 })
  }
}

// DELETE - Delete gallery image
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
