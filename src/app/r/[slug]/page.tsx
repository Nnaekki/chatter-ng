import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export const metadata = {
  title: 'Chatter',
  description: 'A Content Publishing Platform to Share and Read Amazing Stories and Articles.',
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const blog = await db.blog.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          bookmarks: true,
          comments: true,
          blog: true,
        },
        orderBy: {
          createdAt: 'desc'
        },

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!blog) return notFound();
  return (
    <div className="container">
      <h1 className="text-3xl md:text-4xl h-14">{blog.name}</h1>
        {blog.creatorId === session?.user.id ? (
          <div>
            <MiniCreatePost session={session} />
            <PostFeed initialPosts={blog.posts} blogName={blog.name} />
            </div>
        ) : 
        <PostFeed initialPosts={blog.posts} blogName={blog.name} />
        }

    </div>
  );
};

export default Page;
