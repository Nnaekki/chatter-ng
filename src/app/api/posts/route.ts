import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
    const url = new URL(req.url)

    const session = await getAuthSession()

    let followedBlogsIds: string[] = []

    if (session) {
      const followedBlogs = await db.subscription.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          blog: true,
        },
      })
  
      followedBlogsIds = followedBlogs.map(({blog}) => blog.id)
    }
  
    try{
        const {limit, page, blogName} = z.object({
            limit: z.string(),
            page: z.string(),
            blogName: z.string().nullish().optional(),

        }).parse({
            blogName: url.searchParams.get('blogName'),
            limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        })

        let whereClause = {}

        if(blogName) {
            whereClause = {
                blog: {
                    name: blogName,
                }
            }
        }else if (session) {
            whereClause = {
                blog: {
                    id: {
                       in: followedBlogsIds
                    }
                }
            }
        }

        const posts = await db.post.findMany({
            take: parseInt(limit),
skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        blog: true,
        votes: true,
        author: true,
        comments: true,
        bookmarks: true,
      },   
        where: whereClause,     
    })
    return new Response(JSON.stringify(posts))

    }catch (error){
        if(error instanceof z.ZodError) {
            return new Response('Invalid request data passed', {status:422})
        }

    return new Response('Could not fetch posts', { status: 500 })

    }
}