import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostValidator } from '@/lib/validators/post'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, content, blogId } = PostValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const blog = await db.blog.findFirst({
      where: {
        creatorId: session.user.id
      }
    })

    if(!blog) {
      return new Response('You are not authorized to post on this blog', {status: 403})
    }



    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        blogId        
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to blog at this time. Please try later',
      { status: 500 }
    )
  }
}