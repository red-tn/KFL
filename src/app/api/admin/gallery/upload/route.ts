import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()

    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'main-gallery'
    const title = formData.get('title') as string || null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${category}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName)

    // Get max display_order for this category
    const { data: maxOrderData } = await supabase
      .from('gallery_images')
      .select('display_order')
      .eq('category', category)
      .order('display_order', { ascending: false })
      .limit(1)

    const newOrder = (maxOrderData?.[0]?.display_order ?? 0) + 1

    // Insert into gallery_images table
    const { data: imageData, error: insertError } = await supabase
      .from('gallery_images')
      .insert({
        title: title || file.name.split('.')[0],
        image_url: urlData.publicUrl,
        category,
        display_order: newOrder,
        is_featured: false,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      image: imageData,
      url: urlData.publicUrl
    })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
