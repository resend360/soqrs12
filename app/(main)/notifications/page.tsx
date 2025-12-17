import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Check } from 'lucide-react'
import { timeAgo } from '@/lib/utils'

export default async function NotificationsPage() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0

  return (
    <div>
      <Header title="Bildirimler" showNotifications={false} />
      
      <div className="container px-4 py-6 space-y-4">
        {unreadCount > 0 && (
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium">
              {unreadCount} okunmamış bildirim
            </span>
            <Badge variant="default">{unreadCount}</Badge>
          </div>
        )}

        {notifications && notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card key={notification.id} className={notification.is_read ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.is_read ? 'bg-muted' : 'bg-primary/10'
                    }`}>
                      {notification.is_read ? (
                        <Check className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Bell className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {timeAgo(notification.created_at, 'tr')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Henüz bildirim yok</p>
          </div>
        )}
      </div>
    </div>
  )
}
