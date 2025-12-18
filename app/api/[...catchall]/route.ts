import { NextRequest, NextResponse } from 'next/server'

// Catch-all route for unimplemented API endpoints
export async function GET(request: NextRequest) {
  return handleNotImplemented(request)
}

export async function POST(request: NextRequest) {
  return handleNotImplemented(request)
}

export async function PUT(request: NextRequest) {
  return handleNotImplemented(request)
}

export async function DELETE(request: NextRequest) {
  return handleNotImplemented(request)
}

export async function PATCH(request: NextRequest) {
  return handleNotImplemented(request)
}

function handleNotImplemented(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  console.warn(`[API 404] ${request.method} ${pathname} - Not implemented`)

  // List of planned features
  const plannedFeatures: Record<string, string> = {
    '/api/qr/generate': 'QR kod oluşturma - Yakında',
    '/api/notifications/send': 'Bildirim gönderme - Yakında',
    '/api/messages/send': 'Mesaj gönderme - Yakında',
    '/api/park/create-note': 'Park notu oluşturma - Yakında',
    '/api/park/create-spot': 'Park yeri paylaşma - Yakında',
    '/api/vehicles/add': 'Araç ekleme - Yakında',
    '/api/follows/create': 'Takip etme - Yakında',
    '/api/blocks/create': 'Engelleme - Yakında',
    '/api/posts/like': 'Gönderi beğenme - Yakında',
    '/api/posts/comment': 'Yorum yapma - Yakında',
  }

  const feature = Object.entries(plannedFeatures).find(([path]) => 
    pathname.startsWith(path)
  )

  return NextResponse.json(
    {
      error: 'Not Implemented',
      message: feature ? feature[1] : 'Bu API endpoint henüz geliştirilmedi',
      path: pathname,
      method: request.method,
      status: 501,
      hint: 'Bu özellik geliştirme aşamasında. Lütfen daha sonra tekrar deneyin.',
    },
    { 
      status: 501,
      headers: {
        'X-Debug-Info': 'API endpoint not implemented',
      },
    }
  )
}

