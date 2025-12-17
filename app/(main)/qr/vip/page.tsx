'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Check, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

const VIP_DESIGNS = [
  {
    id: 'gold',
    name: 'Altın',
    price: 49.99,
    color: 'from-yellow-400 to-yellow-600',
    features: ['Altın çerçeve', 'Premium görünüm', 'Özel animasyon'],
  },
  {
    id: 'platinum',
    name: 'Platin',
    price: 79.99,
    color: 'from-gray-300 to-gray-500',
    features: ['Platin çerçeve', 'Lüks tasarım', 'Özel efektler', 'Öncelikli destek'],
  },
  {
    id: 'diamond',
    name: 'Elmas',
    price: 149.99,
    color: 'from-blue-400 to-purple-600',
    features: ['Elmas çerçeve', 'Özel logo', 'Animasyonlu QR', 'VIP rozet', 'Premium destek'],
  },
]

export default function VIPQRPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (designId: string) => {
    setLoading(designId)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: 'vip_qr',
          design: designId,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Ödeme sayfası açılamadı',
        variant: 'destructive',
      })
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/qr/my-qr">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              VIP QR Tasarımları
            </h1>
            <p className="text-sm text-muted-foreground">
              QR kodunuzu özelleştirin ve öne çıkın
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {VIP_DESIGNS.map((design) => (
            <Card key={design.id} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${design.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {design.name}
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <span className="text-2xl font-bold text-foreground">
                        ₺{design.price}
                      </span>
                      <span className="text-muted-foreground"> / tek seferlik</span>
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className={`bg-gradient-to-r ${design.color} text-white border-0`}>
                    VIP
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {design.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handlePurchase(design.id)}
                  disabled={loading !== null}
                >
                  {loading === design.id ? 'Yönlendiriliyor...' : 'Satın Al'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Crown className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">VIP QR Avantajları</p>
                <p className="text-sm text-muted-foreground">
                  VIP QR tasarımları ile profiliniz daha profesyonel görünür ve daha fazla dikkat çeker.
                  Tüm ödemeler güvenli Stripe altyapısı ile işlenir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
