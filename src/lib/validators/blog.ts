import {z} from 'zod'


export const BlogValidator = z.object({
    name: z.string().min(3).max(21),
})

export const BlogSubscriptionValidator = z.object({
    blogId: z.string(),
})

export type CreateBlogPayload = z.infer<typeof BlogValidator>
export type SubscribeToBlogPayload = z.infer<typeof BlogSubscriptionValidator>