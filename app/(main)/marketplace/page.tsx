import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Plus, Package, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function MarketplacePage() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get active marketplace items
  const { data: items } = await supabase
    .from('marketplace_items')
    .select(`
      *,
      seller:users!seller_id(username, full_name, avatar_url)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div>
      <Header title="Pazar Yeri" showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Create Listing Button */}
        <Button asChild className="w-full" size="lg">
          <Link href="/marketplace/create">
            <Plus className="w-5 h-5 mr-2" />
            İlan Oluştur
          </Link>
        </Button>

        {/* Items Grid */}
        {items && items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {items.map((item: any) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Item Image */}
                  <div className="aspect-square bg-muted relative">
                    {item.images && item.images[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground opacity-50" />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 capitalize">
                      {item.condition}
                    </Badge>
                  </div>

                  {/* Item Info */}
                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-lg font-bold text-primary">
                      ₺{item.price.toLocaleString('tr-TR')}
                    </p>
                    
                    {/* Seller Info */}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={item.seller?.avatar_url} />
                        <AvatarFallback className="text-xs">
                          {item.seller?.full_name?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        @{item.seller?.username}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span>{item.views || 0} görüntülenme</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">Henüz ilan yok</p>
              <Button asChild variant="outline">
                <Link href="/marketplace/create">İlk İlanı Oluştur</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
