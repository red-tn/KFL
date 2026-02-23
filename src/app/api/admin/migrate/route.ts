import { NextResponse } from 'next/server'
import postgres from 'postgres'

export async function POST() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
  }

  const sql = postgres(databaseUrl, { ssl: 'require' })

  try {
    // Drop old constraint and add new one with all categories including lodging
    await sql`
      ALTER TABLE gallery_images DROP CONSTRAINT IF EXISTS gallery_images_category_check
    `
    await sql`
      ALTER TABLE gallery_images ADD CONSTRAINT gallery_images_category_check CHECK (
        category IN (
          'lakes', 'deer-hunting', 'turkey-hunting', 'fishing', 'lodging',
          'property', 'wildlife', 'main-gallery',
          'hero-home', 'hero-lakes', 'hero-deer', 'hero-turkey', 'hero-fishing',
          'hero-gallery', 'hero-directions', 'hero-contact',
          'overview-deer', 'overview-turkey', 'overview-fishing', 'overview-lodging',
          'card-lakes', 'card-deer', 'card-turkey', 'card-fishing', 'card-lodging'
        )
      )
    `

    await sql.end()
    return NextResponse.json({ success: true, message: 'Database constraint updated to include lodging categories' })
  } catch (error) {
    await sql.end()
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// Also allow GET for easy browser trigger
export async function GET() {
  return POST()
}
