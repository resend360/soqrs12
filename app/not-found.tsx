'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Log 404 for debugging
    if (typeof window !== 'undefined') {
      console.error('404 Error:', {
        path: window.location.pathname,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      })

      // Send to debug bar if active
      if (localStorage.getItem('DEBUG_MODE') === 'true') {
        const event = new CustomEvent('debug-message', {
          detail: {
            type: 'error',
            message: `404: ${window.location.pathname}`,
          },
        })
        window.dispatchEvent(event)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-yellow-500/10">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <CardTitle>404 - Sayfa Bulunamadı</CardTitle>
              <CardDescription>
                Aradığınız sayfa mevcut değil
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Bu sayfa henüz oluşturulmamış olabilir veya URL hatalı olabilir.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Yapabilecekleriniz:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Ana sayfaya dönün</li>
              <li>Geri tuşuna basın</li>
              <li>URL'yi kontrol edin</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/park">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
              <p className="text-xs font-medium text-destructive mb-1">
                Debug Info (Development Only):
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Path: {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
