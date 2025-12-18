import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseInt(searchParams.get('radius') || '500')

    const supabase = await createServerClient()

    // Get nearby park spots using PostGIS
    const { data: spots, error } = await supabase.rpc('get_nearby_park_spots', {
      user_lat: lat,
      user_lng: lng,
      radius_meters: radius,
    })

    if (error) {
      console.error('Error fetching park spots:', error)
      
      // Fallback: Return demo data for testing
      const demoSpots = [
        {
          id: 'demo-1',
          lat: lat + 0.001,
          lng: lng + 0.001,
          username: 'demo_user1',
          created_at: new Date().toISOString(),
        },
        {
          id: 'demo-2',
          lat: lat - 0.002,
          lng: lng + 0.002,
          username: 'demo_user2',
          created_at: new Date().toISOString(),
        },
      ]
      
      return NextResponse.json({ 
        spots: demoSpots,
        demo: true,
        message: 'Demo data - database function not available yet'
      })
    }

    return NextResponse.json({ spots: spots || [] })
  } catch (error) {
    console.error('Park nearby error:', error)
    return NextResponse.json({ spots: [] }, { status: 500 })
  }
}

