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

    // Convert file to buffer for Supabase
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Generate unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const storagePath = `${category}/${uniqueName}`

    console.log('Uploading to Supabase Storage:', storagePath, 'Size:', buffer.length)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(storagePath, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) {
      console.error('Supabase Storage error:', uploadError)
      return NextResponse.json({
        error: `Storage upload failed: ${uploadError.message}. Check bucket "gallery" exists and has public access with INSERT policy for authenticated users.`
      }, { status: 500 })
    }

    // Get public URL from Supabase
    const { data: urlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(storagePath)

    const imageUrl = urlData.publicUrl
    console.log('Upload successful, URL:', imageUrl)

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
        image_url: imageUrl,
        category,
        display_order: newOrder,
        is_featured: false,
        rotation: 0,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return NextResponse.json({ error: `Database error: ${insertError.message}. Check gallery_images table exists and category "${category}" is allowed.` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      image: imageData,
      url: imageUrl
    })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: `Upload failed: ${e instanceof Error ? e.message : String(e)}` }, { status: 500 })
  }
}
