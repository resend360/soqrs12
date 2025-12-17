import { Header } from '@/components/shared/Header'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function MessagesPage() {
  return (
    <div>
      <Header title="Mesajlar" showNotifications />
      
      <div className="container px-4 py-6">
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">Henüz mesaj yok</p>
            <p className="text-sm text-muted-foreground">
              Mesajlaşma özelliği yakında aktif olacak
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
