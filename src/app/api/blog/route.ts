import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlogValidator } from "@/lib/validators/blog";
import { z } from "zod";

export async function POST(req: Request){
    try{
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }
        const body = await req.json()
        const {name} = BlogValidator.parse(body)

        const blogExists = await db.blog.findFirst({
            where: {
                name,
            },
        })

        if (blogExists) {
            return new Response('Blog name already exists', {status: 409})
        }

        const blog = await db.blog.create({
            data: {
                name,
                creatorId: session.user.id,
            },
        })

        await db.subscription.create({
            data: {
                userId: session.user.id,
                blogId: blog.id,
            }
        })
        return new Response(blog.name)
    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response(error.message, {status:422})
        }

        return new Response('Could not create new blog', {status:500})
    }
}