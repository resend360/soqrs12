import { Header } from '@/components/shared/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Image } from 'lucide-react'
import Link from 'next/link'

export default function SocialPage() {
  return (
    <div>
      <Header title="SOQRS" showSearch showNotifications />
      
      <div className="container px-4 py-6 space-y-6">
        {/* Create Post Button */}
        <Button asChild className="w-full" size="lg">
          <Link href="/social/create">
            <Plus className="w-5 h-5 mr-2" />
            Gönderi Oluştur
          </Link>
        </Button>

        {/* Stories Placeholder */}
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-muted" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Hikaye {i}</span>
            </div>
          ))}
        </div>

        {/* Feed Placeholder */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="flex-1">
                    <p className="font-medium">Kullanıcı {i}</p>
                    <p className="text-xs text-muted-foreground">2 saat önce</p>
                  </div>
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm">Gönderi içeriği buraya gelecek...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
