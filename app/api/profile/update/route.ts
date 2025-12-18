import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { withDebug, handleAPIError } from '@/lib/api-handler'

// Support both POST and PUT for compatibility
export async function POST(request: NextRequest) {
  return handleUpdate(request)
}

export async function PUT(request: NextRequest) {
  return handleUpdate(request)
}

async function handleUpdate(request: NextRequest) {
  return withDebug('profile/update', async () => {
    try {
      const supabase = await createServerClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const body = await request.json()
      const { username, full_name, bio, avatar_url, social_links } = body

      // Update user profile
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }

      if (username !== undefined) updateData.username = username
      if (full_name !== undefined) updateData.full_name = full_name
      if (bio !== undefined) updateData.bio = bio
      if (avatar_url !== undefined) updateData.avatar_url = avatar_url
      if (social_links !== undefined) updateData.social_links = social_links

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
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
