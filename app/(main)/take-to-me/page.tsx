import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'

export default function TakeToMePage() {
  return (
    <div>
      <Header title="Take to Me" showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Create Ride Request */}
        <Button asChild size="lg" className="w-full h-16">
          <Link href="/take-to-me/request">
            <Plus className="w-6 h-6 mr-2" />
            Yolculuk İste
          </Link>
        </Button>

        {/* Active Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Aktif Talepler
            </CardTitle>
            <CardDescription>
              Yakınınızdaki yolculuk talepleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Car className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Henüz aktif talep yok</p>
            </div>
          </CardContent>
        </Card>

        {/* Ride History */}
        <Card>
          <CardHeader>
            <CardTitle>Yolculuk Geçmişi</CardTitle>
            <CardDescription>Tamamlanan yolculuklarınız</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Henüz yolculuk yok</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
