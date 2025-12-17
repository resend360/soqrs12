'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Car, Users, MapPin, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <QrCode className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight">
            SOQRS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            QR Tabanlı Sosyal Platform & Carpooling Sistemi
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aracınıza özel QR kod ile park iletişimi kurun, sosyal ağınızı genişletin ve carpooling ile yolculuklarınızı paylaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg">
              <Link href="/register">Hemen Başla</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/login">Giriş Yap</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Özellikler
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <QrCode className="w-12 h-12 text-primary mb-2" />
              <CardTitle>QR Kod Sistemi</CardTitle>
              <CardDescription>
                Her kullanıcıya özel QR kod. Tarama ile anında profil görüntüleme ve iletişim.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <MapPin className="w-12 h-12 text-success mb-2" />
              <CardTitle>Park İletişimi</CardTitle>
              <CardDescription>
                Araçlara not bırakın, park yerinizi paylaşın, bahşiş kazanın.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Car className="w-12 h-12 text-secondary mb-2" />
              <CardTitle>Take to Me</CardTitle>
              <CardDescription>
                Minimal P2P carpooling. Yolculuk talebi oluşturun, teklifler alın.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Users className="w-12 h-12 text-warning mb-2" />
              <CardTitle>Sosyal Platform</CardTitle>
              <CardDescription>
                Feed, hikayeler, shorts. Arkadaşlarınızla bağlantıda kalın.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Shield className="w-12 h-12 text-danger mb-2" />
              <CardTitle>Güvenlik</CardTitle>
              <CardDescription>
                Lokasyon tabanlı uyarılar, güçlü bildirim sistemi ile güvende kalın.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Sparkles className="w-12 h-12 text-primary mb-2" />
              <CardTitle>VIP QR</CardTitle>
              <CardDescription>
                Premium QR tasarımları ile fark yaratın. Renkli, özelleştirilebilir.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Hemen Katıl, Farkı Keşfet
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              SOQRS ile araç sahipleri için yeni bir iletişim deneyimi başlıyor.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/register">Ücretsiz Kayıt Ol</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 SOQRS. Tüm hakları saklıdır.</p>
          <p className="text-sm mt-2">soqrs.com | soqrz.com</p>
        </div>
      </footer>
    </div>
  )
}
