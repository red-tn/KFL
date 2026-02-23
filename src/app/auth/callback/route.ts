import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  const supabase = await createClient()

  // Handle PKCE code exchange (email link click)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/admin/reset-password`)
      }
      return NextResponse.redirect(`${origin}/admin`)
    }
  }

  // Handle token hash (older flow)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as 'recovery' | 'email' })
    if (!error) {
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/admin/reset-password`)
      }
      return NextResponse.redirect(`${origin}/admin`)
    }
  }

  // Error - redirect to login with message
  return NextResponse.redirect(`${origin}/admin/login?error=Invalid+or+expired+link.+Please+try+again.`)
}
