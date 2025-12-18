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
    const { brand, model, year, color, plate_number, is_primary } = body

    // If this is primary, unset other primary vehicles
    if (is_primary) {
      await supabase
        .from('vehicles')
        .update({ is_primary: false })
        .eq('user_id', user.id)
    }

    // Create vehicle
    const { data: vehicle, error } = await supabase
      .from('vehicles')
      .insert({
        user_id: user.id,
        brand,
        model,
        year: parseInt(year),
        color,
        plate_number,
        is_primary,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating vehicle:', error)
      return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 })
    }

    // Generate QR code for vehicle
    const qrUrl = `https://soqrs.com/vehicle/${vehicle.id}`
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`

    await supabase
      .from('qr_codes')
      .insert({
        user_id: user.id,
        vehicle_id: vehicle.id,
        qr_code_url: qrCodeUrl,
        qr_type: 'free',
        is_active: true,
      })

    return NextResponse.json({ success: true, vehicle })
  } catch (error) {
    console.error('Vehicle create error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

