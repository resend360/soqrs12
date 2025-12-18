import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Clock, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function TakeToMePage() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get active ride requests
  const { data: rides } = await supabase
    .from('ride_requests')
    .select(`
      *,
      requester:users!requester_id(username, full_name, avatar_url)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div>
      <Header title="Take to Me" showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Info Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Nasıl Çalışır?</CardTitle>
            <CardDescription>
              Yolculuk isteği oluştur veya başkalarının isteklerine yanıt ver
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Create Request Button */}
        <Button asChild className="w-full" size="lg">
          <Link href="/take-to-me/request">
            <Plus className="w-5 h-5 mr-2" />
            Yolculuk İsteği Oluştur
          </Link>
        </Button>

        {/* Active Requests */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Aktif İstekler</h2>
          
          {rides && rides.length > 0 ? (
            rides.map((ride: any) => (
              <Card key={ride.id}>
                <CardContent className="pt-6 space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={ride.requester?.avatar_url} />
                      <AvatarFallback>
                        {ride.requester?.full_name?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{ride.requester?.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        @{ride.requester?.username}
                      </p>
                    </div>
                    <Badge>{ride.status}</Badge>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Nereden</p>
                        <p className="text-sm text-muted-foreground">{ride.from_location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-red-600" />
                      <div>
                        <p className="text-sm font-medium">Nereye</p>
                        <p className="text-sm text-muted-foreground">{ride.to_location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{ride.passenger_count} kişi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(ride.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {ride.notes && (
                    <p className="text-sm text-muted-foreground border-t pt-2">
                      {ride.notes}
                    </p>
                  )}

                  {/* Actions */}
                  {ride.requester_id !== user.id && (
                    <Button className="w-full">
                      Yanıt Ver
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground mb-4">Henüz aktif istek yok</p>
                <Button asChild variant="outline">
                  <Link href="/take-to-me/request">İlk İsteği Oluştur</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
