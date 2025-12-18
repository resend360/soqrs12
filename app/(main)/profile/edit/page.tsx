'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AvatarUpload } from '@/components/shared/AvatarUpload'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { createBrowserClient } from '@/lib/supabase/client'

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    avatar_url: '',
  })

  // Load current profile data
  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = createBrowserClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/login')
          return
        }

        const { data: profile, error } = await supabase
          .from('users')
          .select('username, full_name, bio, avatar_url')
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (profile) {
          setFormData({
            username: profile.username || '',
            full_name: profile.full_name || '',
            bio: profile.bio || '',
            avatar_url: profile.avatar_url || '',
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast({
          title: 'Hata',
          description: 'Profil bilgileri yüklenemedi',
          variant: 'destructive',
        })
      } finally {
        setInitialLoading(false)
      }
    }

    loadProfile()
  }, [router, toast])

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

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Profil yükleniyor...</p>
        </div>
      </div>
    )
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
              <AvatarUpload
                currentAvatar={formData.avatar_url}
                fallbackText={formData.full_name?.[0]?.toUpperCase() || '?'}
                onUploadComplete={handleAvatarUpload}
              />

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
