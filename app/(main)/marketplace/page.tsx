import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Package } from 'lucide-react'
import Link from 'next/link'

export default function MarketplacePage() {
  return (
    <div>
      <Header title="Marketplace" showSearch showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Create Ad Button */}
        <Button asChild className="w-full" size="lg">
          <Link href="/marketplace/create">
            <Plus className="w-5 h-5 mr-2" />
            İlan Oluştur
          </Link>
        </Button>

        {/* Empty State */}
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">Henüz ilan yok</p>
            <p className="text-sm text-muted-foreground">
              İlk ilanı sen oluştur!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
