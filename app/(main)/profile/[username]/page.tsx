import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, UserPlus, Crown } from 'lucide-react'
import Link from 'next/link'

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const supabase = await createServerClient()
  
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  
  if (!currentUser) {
    redirect('/login')
  }

  // Get profile by username
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('username', params.username)
    .single()

  if (!profile) {
    redirect('/park')
  }

  // Check if viewing own profile
  const isOwnProfile = currentUser.id === profile.id

  if (isOwnProfile) {
    redirect('/profile')
  }

  return (
    <div>
      <Header title="Profil" showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name?.[0]?.toUpperCase() || profile.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{profile.full_name || profile.username}</h1>
                  {profile.is_premium && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-muted-foreground">@{profile.username}</p>
              </div>

              {profile.bio && (
                <p className="text-sm text-muted-foreground max-w-md">
                  {profile.bio}
                </p>
              )}

              <div className="flex gap-2 w-full max-w-sm">
                <Button className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mesaj Gönder
                </Button>
                <Button variant="outline" className="flex-1">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Takip Et
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Gönderi</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Takipçi</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Takip</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts */}
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Henüz gönderi yok</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
