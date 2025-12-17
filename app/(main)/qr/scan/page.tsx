'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function QRScanPage() {
  const [scanning, setScanning] = useState(false)
  const [scannedData, setScannedData] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      )

      scanner.render(
        (decodedText) => {
          setScannedData(decodedText)
          scanner.clear()
          setScanning(false)
          handleScannedData(decodedText)
        },
        (error) => {
          // Ignore errors during scanning
        }
      )

      return () => {
        scanner.clear().catch(() => {})
      }
    }
  }, [scanning])

  const handleScannedData = async (data: string) => {
    try {
      // Parse QR data
      if (data.includes('soqrs.com/@')) {
        const username = data.split('@')[1]
        
        // Get user location for security check
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              
              // Call API to check security and get user profile
              const response = await fetch('/api/qr/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username,
                  location: { lat: latitude, lng: longitude },
                }),
              })

              const result = await response.json()

              if (result.securityAlert) {
                toast({
                  title: 'Güvenlik Uyarısı',
                  description: 'QR kod farklı bir lokasyonda tarandı!',
                  variant: 'destructive',
                })
              }

              // Redirect to user profile
              router.push(`/profile/${username}`)
            },
            () => {
              // Location permission denied, still show profile
              router.push(`/profile/${username}`)
            }
          )
        } else {
          router.push(`/profile/${username}`)
        }
      } else {
        toast({
          title: 'Geçersiz QR Kod',
          description: 'Bu bir SOQRS QR kodu değil',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'QR kod işlenemedi',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">QR Tarat</h1>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/park">
              <X className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {!scanning && !scannedData && (
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 mx-auto">
                <QrCode className="w-10 h-10 text-primary" />
              </div>
              <CardTitle>QR Kod Tarayıcı</CardTitle>
              <CardDescription>
                Bir aracın QR kodunu tarayarak sahibiyle iletişime geçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setScanning(true)}
                className="w-full"
                size="lg"
              >
                Taramayı Başlat
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Kamera izni gereklidir
              </p>
            </CardContent>
          </Card>
        )}

        {scanning && (
          <Card>
            <CardContent className="p-6">
              <div id="qr-reader" className="w-full" />
              <Button
                onClick={() => setScanning(false)}
                variant="outline"
                className="w-full mt-4"
              >
                İptal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
