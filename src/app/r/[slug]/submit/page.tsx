import Editor from "@/components/Editor";
import { Button, buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();

  const blog = await db.blog.findFirst({
    where: {
      name: params.slug,
      creatorId: session?.user.id,
    },
  });

  if (!blog) return notFound();

 {blog.creatorId }



  return (
    <>
      {blog.creatorId === session?.user.id ? (
        <div className="flex flex-col items-start gap-6">
          <div className="border-b border-gray-200 pb-5">
            <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
              <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
                Create Post
              </h3>
              <p className="ml-2 mt-1 truncate text-sm text-gray-500">
                in {params.slug}
              </p>
            </div>
          </div>
          {/* Content form */}
          <Editor blogId={blog.id} />

          <div className="w-full flex justify-end">
            <Button type="submit" className="w-full" form="blog-post-form">
              Post
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center mx-auto gap-2 mt-20">
            <div className="text-center p-5">
              <h1 className="text-red-500 text-3xl">Something Went Wrong</h1>
              <p className="">You are not authorized to post to this blog!</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
            href={"/"}
            className={buttonVariants({
              variant: "outline",
              className: "w-1/3 mb-6",
            })}
          >
            Back to Feed
          </Link>
            </div>
        </>
      )}
    </>
  );
};

export default Page;
