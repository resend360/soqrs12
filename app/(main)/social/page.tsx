import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Header } from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function SocialPage() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get recent posts
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      author:users!author_id(username, full_name, avatar_url)
    `)
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div>
      <Header title="Sosyal" showNotifications />
      
      <div className="container px-4 py-6 space-y-4">
        {/* Create Post Button */}
        <Button asChild className="w-full" size="lg">
          <Link href="/social/create">
            <Plus className="w-5 h-5 mr-2" />
            Yeni Gönderi
          </Link>
        </Button>

        {/* Posts Feed */}
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <Card key={post.id}>
              <CardContent className="pt-6 space-y-4">
                {/* Post Header */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author?.avatar_url} />
                    <AvatarFallback>
                      {post.author?.full_name?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{post.author?.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{post.author?.username}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-sm whitespace-pre-wrap">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-2 border-t">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.likes_count || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments_count || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Henüz gönderi yok</p>
              <Button asChild variant="outline">
                <Link href="/social/create">İlk Gönderiyi Oluştur</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
