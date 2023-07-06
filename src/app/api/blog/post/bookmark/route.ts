import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookmarkValidator } from "@/lib/validators/bookmark";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = req.json();
    console.log('🔥 Received data:', body); // Log the received data

    const { postId } = BookmarkValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
// check if bookmark exists

    const bookmarkExists = await db.bookmark.findFirst({
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
        bookmarks: true,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    if (bookmarkExists) {
      await db.bookmark.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });
      return new Response("OK");
    }

    // if no existing bookmark, create a new  bookmark
    await db.bookmark.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });
    return new Response("OK");
  } catch (error) {
    console.error('🤞Error:', error); // Log the error message
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not handle bookmark request at this time. Please try later",
      {
        status: 500,
      }
    );
  }
}
