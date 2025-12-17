'use client'

import { WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 mx-auto">
            <WifiOff className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Bağlantı Yok</CardTitle>
          <CardDescription>
            İnternet bağlantınızı kontrol edin ve tekrar deneyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Yeniden Dene
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Bazı özellikler çevrimdışı modda kullanılamayabilir
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
