import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { from, to, passengers, notes, location } = body

    // Create ride request
    const { data: ride, error } = await supabase
      .from('ride_requests')
      .insert({
        user_id: user.id,
        from_location: from,
        to_location: to,
        passenger_count: parseInt(passengers),
        notes,
        pickup_location: `POINT(${location.lng} ${location.lat})`,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating ride:', error)
      return NextResponse.json({ error: 'Failed to create ride' }, { status: 500 })
    }

    // TODO: Send notifications to nearby drivers

    return NextResponse.json({ success: true, ride })
  } catch (error) {
    console.error('Ride create error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
