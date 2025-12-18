'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Car, Users, MapPin, ChevronRight, ChevronLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/lib/supabase/client'
import { generateUsername } from '@/lib/utils'
import { AvatarUpload } from '@/components/shared/AvatarUpload'

const TUTORIAL_SLIDES = [
  {
    icon: QrCode,
    title: 'QR Nasıl Kullanılır',
    description: 'Aracınıza özel QR kodunuzu alın. Başkaları tarayarak sizinle iletişime geçebilir.',
  },
  {
    icon: MapPin,
    title: 'Park Özelliklerini Keşfet',
    description: 'Park yerini paylaş, not bırak, bahşiş kazan. Güvenli iletişim kur.',
  },
  {
    icon: Users,
    title: 'Sosyal Platform',
    description: 'Gönderi paylaş, hikayeler oluştur, arkadaşlarınla bağlantıda kal.',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState<'profile' | 'tutorial'>('profile')
  const [tutorialSlide, setTutorialSlide] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    avatar_url: '',
  })
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleGenerateUsername = () => {
    if (formData.full_name) {
      const generated = generateUsername(formData.full_name)
      setFormData({ ...formData, username: generated })
    } else {
      toast({
        title: 'Uyarı',
        description: 'Önce adınızı girin',
        variant: 'destructive',
      })
    }
  }

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.username || !formData.full_name) {
      toast({
        title: 'Hata',
        description: 'Kullanıcı adı ve ad soyad gereklidir',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Kullanıcı bulunamadı')

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          phone: user.phone || '',
          username: formData.username,
          full_name: formData.full_name,
          bio: formData.bio || null,
          avatar_url: formData.avatar_url || null,
        })

      if (profileError) throw profileError

      // Generate QR code (will be done via API)
      await fetch('/api/qr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, username: formData.username }),
      })

      toast({
        title: 'Başarılı',
        description: 'Profiliniz oluşturuldu',
      })
      
      setStep('tutorial')
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Profil oluşturulamadı',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFinishTutorial = () => {
    router.push('/park')
    router.refresh()
  }

  if (step === 'tutorial') {
    const slide = TUTORIAL_SLIDES[tutorialSlide]
    const Icon = slide.icon

    return (
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 mx-auto">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">{slide.title}</CardTitle>
          <CardDescription className="text-base">{slide.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2">
            {TUTORIAL_SLIDES.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === tutorialSlide ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {tutorialSlide > 0 && (
              <Button
                variant="outline"
                onClick={() => setTutorialSlide(tutorialSlide - 1)}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
            )}
            {tutorialSlide < TUTORIAL_SLIDES.length - 1 ? (
              <Button
                onClick={() => setTutorialSlide(tutorialSlide + 1)}
                className="flex-1"
              >
                İleri
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleFinishTutorial} className="flex-1">
                Başla
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={handleFinishTutorial}
            className="w-full"
          >
            Atla
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Profilini Oluştur</CardTitle>
        <CardDescription>Birkaç adımda hesabını tamamla</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitProfile} className="space-y-4">
          <AvatarUpload
            currentAvatar={formData.avatar_url}
            fallbackText={formData.full_name?.[0]?.toUpperCase() || '?'}
            onUploadComplete={(url) => setFormData({ ...formData, avatar_url: url })}
          />

          <div className="space-y-2">
            <Label htmlFor="full_name">Ad Soyad *</Label>
            <Input
              id="full_name"
              type="text"
              placeholder="Ahmet Yılmaz"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı Adı *</Label>
            <div className="flex gap-2">
              <Input
                id="username"
                type="text"
                placeholder="ahmet_y_123"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                disabled={loading}
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateUsername}
                disabled={loading}
              >
                Oluştur
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biyografi (Opsiyonel)</Label>
            <Textarea
              id="bio"
              placeholder="Kendinizden bahsedin..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={loading}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Oluşturuluyor...' : 'Devam Et'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
