'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, MapPin, Navigation } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export default function RequestRidePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    passengers: '1',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch('/api/rides/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  from: formData.from,
                  to: formData.to,
                  passengers: formData.passengers,
                  notes: formData.notes,
                  location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  },
                }),
              })

              const data = await response.json()

              if (response.ok) {
                toast({
                  title: 'Talep Oluşturuldu',
                  description: 'Yolculuk talebiniz yakındaki sürücülere iletildi',
                })
                router.push('/take-to-me')
              } else {
                throw new Error(data.error || 'Failed to create ride request')
              }
            } catch (error: any) {
              console.error('Ride create error:', error)
              toast({
                title: 'Hata',
                description: error.message || 'Talep oluşturulamadı',
                variant: 'destructive',
              })
            } finally {
              setLoading(false)
            }
          },
          (error) => {
            console.error('Location error:', error)
            toast({
              title: 'Konum Hatası',
              description: 'Konum izni gerekli. Lütfen tarayıcı ayarlarından konum iznini verin.',
              variant: 'destructive',
            })
            setLoading(false)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        )
      } else {
        toast({
          title: 'Konum Desteklenmiyor',
          description: 'Tarayıcınız konum servislerini desteklemiyor',
          variant: 'destructive',
        })
        setLoading(false)
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Talep oluşturulamadı',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/take-to-me">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Yolculuk İste</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Yolculuk Detayları</CardTitle>
            <CardDescription>
              Nereden nereye gitmek istediğinizi belirtin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from">Nereden</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="from"
                    placeholder="Başlangıç noktası"
                    className="pl-10"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">Nereye</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="to"
                    placeholder="Varış noktası"
                    className="pl-10"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers">Yolcu Sayısı</Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notlar (Opsiyonel)</Label>
                <Textarea
                  id="notes"
                  placeholder="Ek bilgiler..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Oluşturuluyor...' : 'Talep Oluştur'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Talebiniz yakındaki sürücülere bildirim olarak gönderilecek
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
