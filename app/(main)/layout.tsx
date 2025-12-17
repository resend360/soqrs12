import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { BottomNav } from '@/components/shared/BottomNav'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Check if user profile exists
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('id', session.user.id)
    .single()

  if (!user) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {children}
      <BottomNav />
    </div>
  )
}
