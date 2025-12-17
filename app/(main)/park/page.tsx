import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, MessageSquare, Plus } from 'lucide-react'
import Link from 'next/link'

export default function ParkPage() {
  return (
    <div>
      <Header title="Park" showQR showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button asChild size="lg" className="h-24 flex-col gap-2">
            <Link href="/park/create-spot">
              <Plus className="w-6 h-6" />
              <span>Çıkıyorum</span>
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="h-24 flex-col gap-2">
            <Link href="/qr/scan">
              <MessageSquare className="w-6 h-6" />
              <span>Not Bırak</span>
            </Link>
          </Button>
        </div>

        {/* Park Spots Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Yakındaki Park Yerleri
            </CardTitle>
            <CardDescription>
              500m içindeki müsait park yerleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Harita yükleniyor...</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Park Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Son Notlar</CardTitle>
            <CardDescription>Size bırakılan park notları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Henüz not yok</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
