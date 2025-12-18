import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import LandingPage from '@/components/landing/LandingPage'

export const dynamic = 'force-dynamic'

export default async function Home() {
  try {
    const supabase = await createServerClient()
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      redirect('/park')
    }
    
    return <LandingPage />
  } catch (error) {
    console.error('Home page error:', error)
    // Fallback - show landing page even if Supabase fails
    return <LandingPage />
  }
}
