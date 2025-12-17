import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, username } = await request.json()

    if (userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Generate QR code URL
    const qrData = `https://soqrs.com/@${username}`
    
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })

    // In production, upload to Cloudinary
    // For now, we'll store the data URL
    const qrCodeUrl = qrCodeDataUrl

    // Save to database
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .insert({
        user_id: userId,
        qr_code_url: qrCodeUrl,
        qr_type: 'free',
        qr_design: {
          color: '#000000',
          shape: 'square',
        },
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ qrCode })
  } catch (error: any) {
    console.error('QR generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
