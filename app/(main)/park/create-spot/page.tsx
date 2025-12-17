'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export default function CreateParkSpotPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    location: '',
    notes: '',
    duration: '30',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const response = await fetch('/api/park/create-spot', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...formData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
            })

            if (response.ok) {
              toast({
                title: 'Park Yeri Paylaşıldı',
                description: 'Yakındaki kullanıcılar bilgilendirildi',
              })
              router.push('/park')
            } else {
              throw new Error('Failed to create park spot')
            }
          },
          () => {
            toast({
              title: 'Konum Hatası',
              description: 'Konum izni gerekli',
              variant: 'destructive',
            })
            setLoading(false)
          }
        )
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Park yeri paylaşılamadı',
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
            <Link href="/park">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Çıkıyorum</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Park Yeri Paylaş</CardTitle>
            <CardDescription>
              Ayrıldığın park yerini paylaş, yakındakiler bilgilensin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Konum Açıklaması</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Örn: Cadde Park AVM yanı"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Ne Kadar Süre Sonra Boşalacak? (dakika)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  max="120"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
                {loading ? 'Paylaşılıyor...' : 'Park Yerini Paylaş'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Konumun otomatik olarak alınacak ve yakındaki kullanıcılara bildirilecek
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
