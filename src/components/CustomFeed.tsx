import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import React from "react";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";
import { BsHouse } from "react-icons/bs";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedBlogs = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      blog: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      blog: {
        name: {
          in: followedBlogs.map(({ blog }) => blog.id),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      bookmarks: true,
      blog: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return (
    <div className="container pt-12">
<h1 className='font-bold text-3xl md:text-4xl'>Your feed</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>  
      <div className="col-span-2">
   {/* feed */}
   <PostFeed initialPosts={posts} />

      </div>
     <div className='overflow-hidden col-span-1 h-fit rounded-lg border border-gray-200 order-first md:order-last'>
     <div className='bg-blue-100 px-6 py-4'>
     <p className='font-semibold py-3 flex items-center gap-1.5'>
              <BsHouse />
              Home
            </p>
  
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
          <div className='flex justify-between gap-x-4 py-3'>
              <p className="text-zinc-500">
                Your personal Chatter homepage. Come here to check in with your
                favorite authors and blogs.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href={`/r/create`}
            >
              Create a Chatter Blog
            </Link>
            </dl>
        </div>
      </div>    
      </div>
  );
};

export default CustomFeed;
