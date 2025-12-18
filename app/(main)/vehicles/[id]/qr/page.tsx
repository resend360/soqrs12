import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function VehicleQRPage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get vehicle
  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!vehicle) {
    redirect('/vehicles')
  }

  // Get QR code
  const { data: qrCode } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('vehicle_id', vehicle.id)
    .eq('is_active', true)
    .single()

  return (
    <div>
      <Header title="Araç QR Kodu" showNotifications={false} />
      
      <div className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/vehicles">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">{vehicle.brand} {vehicle.model}</h1>
            <p className="text-sm text-muted-foreground">{vehicle.plate_number}</p>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Araç QR Kodu</CardTitle>
            <CardDescription>
              Bu QR kodu tarayarak aracınla iletişime geçebilirler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {qrCode ? (
              <>
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-lg">
                    <Image
                      src={qrCode.qr_code_url}
                      alt="Vehicle QR Code"
                      width={300}
                      height={300}
                      className="w-full max-w-[300px] h-auto"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="font-medium text-lg">{vehicle.plate_number}</p>
                  <p className="text-sm text-muted-foreground">
                    soqrs.com/vehicle/{vehicle.id}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex-col h-20 gap-2">
                    <Download className="w-5 h-5" />
                    <span className="text-xs">İndir</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 gap-2">
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs">Paylaş</span>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tarama Sayısı</span>
                    <span className="text-sm font-medium">{qrCode.scan_count || 0}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">QR kod oluşturuluyor...</p>
                <Button asChild>
                  <Link href="/vehicles">Araçlara Dön</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">💡 Nasıl Kullanılır?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• QR kodu aracının camına yapıştır</li>
              <li>• Başkaları QR'ı tarayarak seninle iletişime geçebilir</li>
              <li>• Park ihlali, acil durum veya bilgi için kullanılabilir</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

