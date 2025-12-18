'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    avatar_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Başarılı',
          description: 'Profilin güncellendi',
        })
        router.push('/profile')
      } else {
        throw new Error('Profile update failed')
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Profil güncellenemedi',
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
            <Link href="/profile">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Profili Düzenle</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>
              Profil bilgilerini güncelle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    {formData.full_name?.[0]?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Fotoğraf Değiştir
                </Button>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">@</span>
                  <Input
                    id="username"
                    placeholder="kullaniciadi"
                    className="pl-8"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full_name">Ad Soyad</Label>
                <Input
                  id="full_name"
                  placeholder="Adın Soyadın"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Hakkında</Label>
                <Textarea
                  id="bio"
                  placeholder="Kendinden bahset..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  maxLength={150}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/150
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
