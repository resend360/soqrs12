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
    const { username, location } = body

    // Get the scanned user's profile
    const { data: scannedUser } = await supabase
      .from('users')
      .select('id, username, full_name, avatar_url')
      .eq('username', username)
      .single()

    if (!scannedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get the QR code to increment scan count
    const { data: qrCode } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('user_id', scannedUser.id)
      .eq('is_active', true)
      .single()

    if (qrCode) {
      // Increment scan count
      await supabase
        .from('qr_codes')
        .update({ scan_count: qrCode.scan_count + 1 })
        .eq('id', qrCode.id)

      // Log the scan for security
      await supabase
        .from('qr_scans')
        .insert({
          qr_code_id: qrCode.id,
          scanner_id: user.id,
          scan_location: location ? `POINT(${location.lng} ${location.lat})` : null,
        })

      // TODO: Check for security alerts (unusual location patterns)
      // For now, just return success
    }

    return NextResponse.json({ 
      success: true, 
      user: scannedUser,
      securityAlert: false 
    })
  } catch (error) {
    console.error('QR scan error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
