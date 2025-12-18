import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { content } = body

    // Create social post
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        author_id: user.id,
        content,
        type: 'post',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Social create error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

