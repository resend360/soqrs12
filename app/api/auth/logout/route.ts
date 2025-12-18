import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  
  await supabase.auth.signOut()
  
  return NextResponse.redirect(new URL('/login', request.url))
}

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  
  await supabase.auth.signOut()
  
  return NextResponse.redirect(new URL('/login', request.url))
}
