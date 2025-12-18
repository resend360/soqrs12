import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, price, category, condition } = body

    // Create marketplace listing
    const { data: listing, error } = await supabase
      .from('marketplace_items')
      .insert({
        seller_id: user.id,
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating listing:', error)
      return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
    }

    return NextResponse.json({ success: true, listing })
  } catch (error) {
    console.error('Marketplace create error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

