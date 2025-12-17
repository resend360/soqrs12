import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Share2, Crown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function MyQRPage() {
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

  const { data: qrCode } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .single()

  if (!profile || !qrCode) {
    redirect('/onboarding')
  }

  return (
    <div>
      <Header title="QR Kodum" showNotifications={false} />
      
      <div className="container px-4 py-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Senin QR Kodun</CardTitle>
            <CardDescription>
              Bu QR kodu tarayarak profiline ulaşabilirler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <Image
                  src={qrCode.qr_code_url}
                  alt="QR Code"
                  width={300}
                  height={300}
                  className="w-full max-w-[300px] h-auto"
                />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="font-medium text-lg">@{profile.username}</p>
              <p className="text-sm text-muted-foreground">
                soqrs.com/@{profile.username}
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">QR Tipi</span>
                <span className="text-sm font-medium capitalize">
                  {qrCode.qr_type === 'free' ? 'Ücretsiz' : 'Premium'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tarama Sayısı</span>
                <span className="text-sm font-medium">{qrCode.scan_count}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {!profile.is_premium && (
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Crown className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">VIP QR'a Yükselt</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Renkli, özelleştirilebilir QR kodlar. Logolu tasarımlar. Fark yarat!
                  </p>
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/vip">
                      Detayları Gör
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
