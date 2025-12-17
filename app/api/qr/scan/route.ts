import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { calculateDistance } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { username, location } = await request.json()

    // Get scanned user profile
    const { data: scannedUser, error: userError } = await supabase
      .from('users')
      .select('id, username, full_name, avatar_url, bio')
      .eq('username', username)
      .single()

    if (userError || !scannedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get QR code
    const { data: qrCode } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('user_id', scannedUser.id)
      .eq('is_active', true)
      .single()

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 })
    }

    // Increment scan count
    await supabase
      .from('qr_codes')
      .update({ scan_count: qrCode.scan_count + 1 })
      .eq('id', qrCode.id)

    // Send notification to QR owner
    await supabase.from('notifications').insert({
      user_id: scannedUser.id,
      type: 'qr_scan',
      title: 'QR Kodunuz Tarandı',
      message: `Bir kullanıcı QR kodunuzu taradı`,
      data: {
        scanner_id: user.id,
        location: location,
      },
    })

    // Security check if location provided
    let securityAlert = false
    if (location && location.lat && location.lng) {
      // Get vehicle's last known location (if exists)
      const { data: vehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('qr_code_id', qrCode.id)
        .single()

      if (vehicle) {
        // In a real app, you'd track vehicle location
        // For now, we'll skip the actual distance check
        // and just log the scan location
        
        // Example: Check if distance > 500m
        // const distance = calculateDistance(...)
        // if (distance > 500) { securityAlert = true }
      }
    }

    return NextResponse.json({
      user: scannedUser,
      securityAlert,
    })
  } catch (error: any) {
    console.error('QR scan error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process QR scan' },
      { status: 500 }
    )
  }
}
