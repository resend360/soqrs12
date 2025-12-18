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
    const { location, notes, duration, latitude, longitude } = body

    // Calculate expiry time
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(duration))

    // Create park spot
    const { data: spot, error } = await supabase
      .from('park_spots')
      .insert({
        user_id: user.id,
        location: `POINT(${longitude} ${latitude})`,
        description: location,
        notes,
        status: 'available',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating park spot:', error)
      return NextResponse.json({ error: 'Failed to create park spot' }, { status: 500 })
    }

    // TODO: Send notifications to nearby users

    return NextResponse.json({ success: true, spot })
  } catch (error) {
    console.error('Park spot create error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

