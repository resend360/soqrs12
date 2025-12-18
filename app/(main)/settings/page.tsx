'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/shared/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { 
  Bell, 
  Globe, 
  Shield, 
  Moon, 
  LogOut,
  Trash2,
  HelpCircle,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    profileVisibility: true,
    locationSharing: true,
    showPhone: false,
    darkMode: false,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: Save settings to database
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Başarılı',
        description: 'Ayarlar kaydedildi',
      })
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Ayarlar kaydedilemedi',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

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
              Bildirim tercihlerini yönet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Bildirimleri</Label>
              <Switch 
                id="push-notifications" 
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
              <Switch 
                id="email-notifications" 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Bildirimleri</Label>
              <Switch 
                id="sms-notifications" 
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
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
              Uygulama dilini değiştir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <select className="w-full p-2 border rounded-md">
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Gizlilik
            </CardTitle>
            <CardDescription>
              Gizlilik ve güvenlik ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility">Profil Görünürlüğü</Label>
              <Switch 
                id="profile-visibility" 
                checked={settings.profileVisibility}
                onCheckedChange={(checked) => setSettings({...settings, profileVisibility: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="location-sharing">Konum Paylaşımı</Label>
              <Switch 
                id="location-sharing" 
                checked={settings.locationSharing}
                onCheckedChange={(checked) => setSettings({...settings, locationSharing: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-phone">Telefon Numarasını Göster</Label>
              <Switch 
                id="show-phone" 
                checked={settings.showPhone}
                onCheckedChange={(checked) => setSettings({...settings, showPhone: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Görünüm
            </CardTitle>
            <CardDescription>
              Tema ve görünüm ayarları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Karanlık Mod</Label>
              <Switch 
                id="dark-mode" 
                checked={settings.darkMode}
                onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full" 
          size="lg"
          disabled={loading}
        >
          {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </Button>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>Destek ve Yardım</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/help">
                <HelpCircle className="w-5 h-5 mr-2" />
                Yardım Merkezi
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/terms">
                <FileText className="w-5 h-5 mr-2" />
                Kullanım Koşulları
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/privacy">
                <FileText className="w-5 h-5 mr-2" />
                Gizlilik Politikası
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Tehlikeli Bölge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-destructive" asChild>
              <Link href="/api/auth/logout">
                <LogOut className="w-5 h-5 mr-2" />
                Çıkış Yap
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive">
              <Trash2 className="w-5 h-5 mr-2" />
              Hesabı Sil
            </Button>
          </CardContent>
        </Card>

        {/* Version */}
        <div className="text-center text-xs text-muted-foreground">
          SOQRS v1.0.0
        </div>
      </div>
    </div>
  )
}
