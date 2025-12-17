import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, QrCode, Car, Grid, Crown } from 'lucide-react'
import Link from 'next/link'

export default async function ProfilePage() {
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

  return (
    <div>
      <Header title="Profil" showNotifications={false} />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url || ''} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                  {profile.is_premium && (
                    <Crown className="w-5 h-5 text-warning" />
                  )}
                </div>
                <p className="text-muted-foreground">@{profile.username}</p>
              </div>

              {profile.bio && (
                <p className="text-sm text-muted-foreground max-w-md">
                  {profile.bio}
                </p>
              )}

              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Gönderi</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Takipçi</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Takip</p>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/profile/edit">
                    Profili Düzenle
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link href="/settings">
                    <Settings className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button asChild variant="outline" className="h-20 flex-col gap-2">
            <Link href="/qr/my-qr">
              <QrCode className="w-6 h-6" />
              <span>QR Kodum</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20 flex-col gap-2">
            <Link href="/vehicles">
              <Car className="w-6 h-6" />
              <span>Araçlarım</span>
            </Link>
          </Button>
        </div>

        {/* VIP Banner */}
        {!profile.is_premium && (
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">VIP QR'a Geç</h3>
                <p className="text-sm opacity-90">Premium özelliklerle fark yarat</p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/vip">
                  <Crown className="w-4 h-4 mr-2" />
                  Yükselt
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">
              <Grid className="w-4 h-4 mr-2" />
              Gönderiler
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex-1">
              <Car className="w-4 h-4 mr-2" />
              Araçlar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              <Grid className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Henüz gönderi yok</p>
            </div>
          </TabsContent>
          
          <TabsContent value="vehicles" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              <Car className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Henüz araç eklenmedi</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/vehicles/add">Araç Ekle</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
