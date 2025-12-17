import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Bell, Shield, Globe, LogOut } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/onboarding')
  }

  const notificationSettings = profile.notification_settings as any

  return (
    <div>
      <Header title="Ayarlar" showNotifications={false} />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Bildirimler
            </CardTitle>
            <CardDescription>
              Bildirim tercihlerinizi yönetin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="qr_scan" className="flex-1">
                QR Tarama Bildirimleri
              </Label>
              <Switch
                id="qr_scan"
                defaultChecked={notificationSettings?.qr_scan}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="messages" className="flex-1">
                Mesaj Bildirimleri
              </Label>
              <Switch
                id="messages"
                defaultChecked={notificationSettings?.messages}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="social" className="flex-1">
                Sosyal Bildirimler
              </Label>
              <Switch
                id="social"
                defaultChecked={notificationSettings?.social}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="park_notes" className="flex-1">
                Park Notu Bildirimleri
              </Label>
              <Switch
                id="park_notes"
                defaultChecked={notificationSettings?.park_notes}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="security" className="flex-1">
                Güvenlik Uyarıları
              </Label>
              <Switch
                id="security"
                defaultChecked={notificationSettings?.security}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ride" className="flex-1">
                Yolculuk Bildirimleri
              </Label>
              <Switch
                id="ride"
                defaultChecked={notificationSettings?.ride}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Gizlilik & Güvenlik
            </CardTitle>
            <CardDescription>
              Gizlilik ayarlarınızı yönetin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="location" className="flex-1">
                Konum İzni
              </Label>
              <Switch
                id="location"
                defaultChecked={profile.location_permission}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="profile_visibility" className="flex-1">
                Profil Görünürlüğü
              </Label>
              <Switch
                id="profile_visibility"
                defaultChecked={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Dil
            </CardTitle>
            <CardDescription>
              Uygulama dilini değiştirin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">Mevcut Dil: <span className="font-medium">Türkçe</span></p>
              <Button variant="outline" className="w-full">
                Dili Değiştir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="pt-6 space-y-2">
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="outline" className="w-full justify-start">
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış Yap
              </Button>
            </form>
            <Button variant="destructive" className="w-full justify-start">
              Hesabı Sil
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground py-4">
          <p>SOQRS v1.0.0</p>
          <p className="mt-1">© 2024 Tüm hakları saklıdır</p>
        </div>
      </div>
    </div>
  )
}
