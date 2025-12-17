import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Log all requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] ${request.method} ${pathname}`)
  }

  // Handle API routes that don't exist
  if (pathname.startsWith('/api/')) {
    // List of implemented API routes
    const implementedRoutes = [
      '/api/auth/login',
      '/api/auth/logout',
      '/api/sms/send-otp',
      '/api/profile/update',
      '/api/qr/scan',
      '/api/park/nearby',
      '/api/rides/create',
      '/api/marketplace/create',
      '/api/social/create',
      '/api/stripe/create-checkout',
    ]

    const isImplemented = implementedRoutes.some(route => pathname.startsWith(route))

    if (!isImplemented) {
      console.warn(`[404 API] ${pathname} - Not implemented yet`)
      
      return NextResponse.json(
        {
          error: 'Not implemented',
          message: 'Bu API endpoint henüz geliştirilmedi',
          path: pathname,
          status: 501,
        },
        { status: 501 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
