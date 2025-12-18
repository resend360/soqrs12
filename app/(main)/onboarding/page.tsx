'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AvatarUpload } from '@/components/shared/AvatarUpload'
import { useToast } from '@/hooks/use-toast'
import { User } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    avatar_url: '',
  })

  const handleAvatarUpload = (url: string) => {
    setFormData({ ...formData, avatar_url: url })
  }

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
          title: 'Hoş Geldin! 🎉',
          description: 'Profilin başarıyla oluşturuldu',
        })
        router.push('/park')
      } else {
        throw new Error('Profile update failed')
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Profil oluşturulamadı',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
            <User className="w-8 h-8 text-primary" />
          </div>
          <CardTitle>Profilini Oluştur</CardTitle>
          <CardDescription>
            SOQRS'e hoş geldin! Hemen başlayalım
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar */}
            <AvatarUpload
              currentAvatar={formData.avatar_url}
              fallbackText={formData.full_name?.[0]?.toUpperCase() || '?'}
              onUploadComplete={handleAvatarUpload}
            />

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı *</Label>
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
              <p className="text-xs text-muted-foreground">
                Sadece harf, rakam ve alt çizgi kullanabilirsin
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Ad Soyad *</Label>
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
              <Label htmlFor="bio">Hakkında (Opsiyonel)</Label>
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
              {loading ? 'Oluşturuluyor...' : 'Devam Et'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
