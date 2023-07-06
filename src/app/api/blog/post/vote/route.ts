import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PostVoteValidator } from "@/lib/validators/vote";
import { CachedPost } from "@/types/redis";
import { z } from "zod";

const CACHE_AFTER_UPVOTES = 1;

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // check if user has already voted on this post
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
        bookmarks: true,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // ...

    // Recount the votes
    const votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    const currentVote = existingVote?.type ?? null;
    const isBookmarked = post.bookmarks.some(
      (bookmark) => bookmark.userId === session.user.id
    );

    if (votesAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedPost = {
        authorUsername: post.author.username ?? "",
        authorImage: post.author.image ?? "",
        content: JSON.stringify(post.content),
        id: post.id,
        title: post.title,
        currentVote,
        createdAt: post.createdAt,
        isBookmarked,
      };

      await redis.hset(`post:${postId}`, cachePayload); // Store the post data as a hash
    }

    return new Response("OK");
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not register your vote for this post. Please try later",
      { status: 500 }
    );
  }
}
