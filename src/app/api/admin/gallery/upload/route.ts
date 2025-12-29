import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const storagePath = `${category}/${uniqueName}`

    let imageUrl: string

    // Try Supabase Storage first
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      // If storage fails, fall back to local file storage
      console.log('Supabase Storage failed, using local storage:', uploadError.message)

      try {
        // Save to public/uploads directory
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', category)
        await mkdir(uploadsDir, { recursive: true })

        const localPath = path.join(uploadsDir, uniqueName)
        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(localPath, buffer)

        imageUrl = `/uploads/${category}/${uniqueName}`
      } catch (localError) {
        console.error('Local storage also failed:', localError)
        return NextResponse.json({
          error: `Storage failed. Create a Supabase Storage bucket named "gallery" with public access, or ensure write permissions to public/uploads. Details: ${uploadError.message}`
        }, { status: 500 })
      }
    } else {
      // Get public URL from Supabase
      const { data: urlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(storagePath)
      imageUrl = urlData.publicUrl
    }

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
      return NextResponse.json({ error: `Database error: ${insertError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      image: imageData,
      url: imageUrl
    })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: `Upload failed: ${e instanceof Error ? e.message : 'Unknown error'}` }, { status: 500 })
  }
}
