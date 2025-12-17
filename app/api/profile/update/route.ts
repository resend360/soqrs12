import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { withDebug, handleAPIError } from '@/lib/api-handler'

export async function PUT(request: NextRequest) {
  return withDebug('profile/update', async () => {
    try {
      const supabase = await createServerClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const body = await request.json()
      const { full_name, bio, avatar_url, social_links } = body

      // Update user profile
      const { data, error } = await supabase
        .from('users')
        .update({
          full_name,
          bio,
          avatar_url,
          social_links,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Profile update error:', error)
        return NextResponse.json(
          { error: 'Failed to update profile', details: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, user: data })
    } catch (error: any) {
      const errorResponse = handleAPIError(error)
      return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
    }
  })
}
