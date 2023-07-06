import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlogSubscriptionValidator } from "@/lib/validators/blog";
import { z } from "zod";

export async function POST(req: Request){
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()
        const {blogId} = BlogSubscriptionValidator.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                blogId,
                userId: session.user.id,
            },
        })

        if(subscriptionExists) {
            return new Response('You already follow this blog.', {
                status: 400,
            })
        }

        await db.subscription.create({
            data: {
                blogId,
                userId: session.user.id,
            }
        })

        return new Response(blogId)

    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request data passed', {status:422})
        }

        return new Response('Could not follow this blog, please try again later.', {status:500})
    }
} 