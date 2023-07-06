import FollowUnfollowToggle from "@/components/FollowUnfollowToggle";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const blog = await db.blog.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          blog: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!blog) return notFound();

  const followerCount = await db.subscription.count({
    where: {
      blog: {
        name: slug,
      },
    },
  });

  const postCount = await db.post.count({
    where: {
      blog: {
        name: slug,
      },
    },
  });

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12 bg-gray-200">
      <div>
        {/* TODO: Button to go back */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About {blog.name}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={blog.createdAt.toDateString()}>
                    {format(blog.createdAt, "MMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Followers</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{followerCount}</div>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Posts</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{postCount}</div>
                </dd>
              </div>

              {blog.creatorId === session?.user.id ? (
                <>
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this blog</p>
                </div>

                <div>
                <Link  
                href={`r/${slug}/submit`}
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full mb-6'
                })}>
                  Create New Post
                </Link>

                </div>
                </>
              ) : null}

              {blog.creatorId !== session?.user.id ? (
                <FollowUnfollowToggle 
                blogId={blog.id} 
                blogName={blog.name} 
                isSubscribed={isSubscribed}
                />
              ) : null}

            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
