import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Car, Plus, QrCode, Settings } from 'lucide-react'
import Link from 'next/link'

export default async function VehiclesPage() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get user's vehicles
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <Header title="Araçlarım" showNotifications={false} />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Add Vehicle Button */}
        <Button asChild className="w-full" size="lg">
          <Link href="/vehicles/add">
            <Plus className="w-5 h-5 mr-2" />
            Araç Ekle
          </Link>
        </Button>

        {/* Vehicles List */}
        {vehicles && vehicles.length > 0 ? (
          <div className="space-y-4">
            {vehicles.map((vehicle: any) => (
              <Card key={vehicle.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Vehicle Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Car className="w-8 h-8 text-primary" />
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.year} • {vehicle.color}
                          </p>
                        </div>
                        {vehicle.is_primary && (
                          <Badge variant="secondary">Birincil</Badge>
                        )}
                      </div>

                      {/* Plate Number */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                        <span className="font-mono font-bold">
                          {vehicle.plate_number}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/vehicles/${vehicle.id}/qr`}>
                            <QrCode className="w-4 h-4 mr-2" />
                            QR Kod
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/vehicles/${vehicle.id}/edit`}>
                            <Settings className="w-4 h-4 mr-2" />
                            Düzenle
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Car className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-2">Henüz araç eklemedin</p>
              <p className="text-sm text-muted-foreground mb-4">
                Aracını ekle, QR kodunu oluştur
              </p>
              <Button asChild variant="outline">
                <Link href="/vehicles/add">İlk Aracı Ekle</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">💡 Bilgi</h3>
            <p className="text-sm text-muted-foreground">
              Her aracın kendine özel QR kodu olur. Başkaları QR'ı tarayarak seninle iletişime geçebilir.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
