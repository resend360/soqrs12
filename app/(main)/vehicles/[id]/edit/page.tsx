'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export default function EditVehiclePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear().toString(),
    color: '',
    plate_number: '',
    is_primary: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Update vehicle via API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Başarılı',
        description: 'Araç bilgileri güncellendi',
      })
      router.push('/vehicles')
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Araç güncellenemedi',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/vehicles">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Aracı Düzenle</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Araç Bilgileri</CardTitle>
            <CardDescription>
              Araç bilgilerini güncelle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marka *</Label>
                  <Input
                    id="brand"
                    placeholder="Örn: Toyota"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="Örn: Corolla"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Yıl *</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Renk *</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Renk seç" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beyaz">Beyaz</SelectItem>
                      <SelectItem value="Siyah">Siyah</SelectItem>
                      <SelectItem value="Gri">Gri</SelectItem>
                      <SelectItem value="Gümüş">Gümüş</SelectItem>
                      <SelectItem value="Mavi">Mavi</SelectItem>
                      <SelectItem value="Kırmızı">Kırmızı</SelectItem>
                      <SelectItem value="Yeşil">Yeşil</SelectItem>
                      <SelectItem value="Sarı">Sarı</SelectItem>
                      <SelectItem value="Turuncu">Turuncu</SelectItem>
                      <SelectItem value="Kahverengi">Kahverengi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plate_number">Plaka *</Label>
                <Input
                  id="plate_number"
                  placeholder="34 ABC 1234"
                  value={formData.plate_number}
                  onChange={(e) => setFormData({ ...formData, plate_number: e.target.value.toUpperCase() })}
                  required
                  maxLength={20}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="is_primary">Birincil Araç</Label>
                  <p className="text-xs text-muted-foreground">
                    Bu aracı varsayılan olarak kullan
                  </p>
                </div>
                <Switch
                  id="is_primary"
                  checked={formData.is_primary}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_primary: checked })}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push('/vehicles')}
                  disabled={loading}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

