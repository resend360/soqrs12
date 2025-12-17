import { NextRequest, NextResponse } from 'next/server'
import { sendOTP } from '@/lib/netgsm'

// Test numaraları - SMS göndermeden direkt başarılı döner
const TEST_PHONES = ['+905511074559', '+905559876543']
const DEV_OTP = '123456' // Development OTP kodu

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()

    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Phone and code are required' },
        { status: 400 }
      )
    }

    // Test numarası kontrolü
    if (TEST_PHONES.includes(phone)) {
      console.log(`[DEV MODE] Test phone detected: ${phone}, skipping SMS`)
      return NextResponse.json({ 
        success: true,
        dev_mode: true,
        message: 'Test mode - use OTP: 123456'
      })
    }

    // Gerçek SMS gönderimi
    const success = await sendOTP(phone, code)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to send SMS' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('SMS send error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
