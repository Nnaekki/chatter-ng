import Image from 'next/image'
import EditorOutput from "@/components/EditorOutput"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { formatTimeToNow } from "@/lib/utils"
import { CachedPost } from "@/types/redis"
import { Bookmark, Post, User, Vote } from "@prisma/client"
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import PostVoteServer from '@/components/post-vote/PostVoteServer'
import { buttonVariants } from "@/components/ui/Button"
import CommentsSection from '@/components/CommentsSection'
import { getAuthSession } from "@/lib/auth";



interface PageProps {
  params: {
    postId: string
  }
}

export const metadata = {
  title: 'Chatter',
  description: 'A Content Publishing Platform to Share and Read Amazing Stories and Articles.',
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const page = async ({params}: PageProps) => {
    const cachedPost = (await redis.hgetall(
        `post:${params.postId}`
      )) as CachedPost
    
      let post: (Post & { votes: Vote[]; author: User; bookmarks: Bookmark[]  }) | null = null
      if (!cachedPost) {
        post = await db.post.findFirst({
          where: {
            id: params.postId,
          },
          include: {
            votes: true,
            author: true,
            bookmarks: true,
          },
        })
      }
    
      if (!post && !cachedPost) return notFound()
      const session = await getAuthSession();

      const isBookmarked = post
      ? post.bookmarks.some((bookmark) => bookmark.userId === session?.user?.id)
      : cachedPost.isBookmarked;

      const currentVote = post
      ? post.votes.find((vote) => vote.userId === session?.user?.id)?.type
      : cachedPost.currentVote;

      return (
        <div className='pt-12 container'>
          <div className='h-full flex flex-row items-center justify-between'>
            <Suspense fallback={<PostVoteShell />}>
              {/* @ts-expect-error server component */}
              <PostVoteServer
                postId={post?.id ?? cachedPost.id}
                initialVote={currentVote}
                getData={async () => {
                  return await db.post.findUnique({
                    where: {
                      id: params.postId,
                    },
                    include: {
                      votes: true,
                    },
                  })
                }}
              />
            </Suspense>
    
            <div className='sm:w-0 w-full flex-1 bg-white p-4 rounded-sm'>
                <div className="flex gap-2">
                {(post?.author.image ?? cachedPost.authorImage) && (
                  <Image
                    src={post?.author.image ?? cachedPost.authorImage}
                    className="object-fit rounded-full"
                    height={40}
                    width={40}
                    alt=""
                  />
                )}
                <div className='max-h-40 mt-1 truncate text-xs text-gray-500'>
                  <span className="flex ">Posted by {post?.author.name ?? cachedPost.authorUsername}</span>
                  {""}
                  {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
                </div>
              </div>
                     
              <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
                {post?.title ?? cachedPost.title}
              </h1>
    
              <EditorOutput content={post?.content ?? cachedPost.content} />
              <Suspense
                fallback={
                  <Loader2 className='h-5 w-5 animate-spin text-zinc-500' />
                }>
                {/* @ts-expect-error Server Component */}
                <CommentsSection postId={post?.id ?? cachedPost.id} />
              </Suspense>
            </div>
          </div>
        </div>
      )}
      function PostVoteShell() {
        return (
      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6 flex justify-between">
            <div className={buttonVariants({ variant: 'ghost' })}>
              <ThumbsUp className='h-5 w-5 text-zinc-700' />
            </div>
      
            <div className='text-center py-2 font-medium text-sm text-zinc-900'>
              <Loader2 className='h-3 w-3 animate-spin' />
            </div>
      
            <div className={buttonVariants({ variant: 'ghost' })}>
              <ThumbsDown className='h-5 w-5 text-zinc-700' />
            </div>
          </div>
        )
      }
      
export default page