import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  
  await supabase.auth.signOut()
  
  const loginUrl = new URL('/login', request.nextUrl.origin)
  return NextResponse.redirect(loginUrl)
}

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  
  await supabase.auth.signOut()
  
  const loginUrl = new URL('/login', request.nextUrl.origin)
  return NextResponse.redirect(loginUrl)
}
