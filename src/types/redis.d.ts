import { Vote, VoteType } from "@prisma/client"

export type CachedPost = {
    id: string
    title: string
    authorUsername: string
    authorImage: string
    content: string
    currentVote: VoteType | null
    createdAt: Date
  isBookmarked: boolean;  
}