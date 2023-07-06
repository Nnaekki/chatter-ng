import Image from 'next/image'
import hero from 'public/hero.png'
import Link from 'next/link'
import { db } from '@/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import PostFeed from './PostFeed'
import { buttonVariants } from "@/components/ui/Button";


const GeneralFeed = async () => {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            bookmarks: true,
            blog: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    })


  return (
    <div >
    <section className='bg-gray-300 mt-0 flex justify-between items-center py-10 md:py-0 max-w-7xl mx-auto'>
      <div className="px-10 space-y-5 ">        
      <h1 className='text-5xl max-w-xl font-serif'>Stories that are worth reading</h1>
        <h3> Discover great stories to broaden your perspective on any subject </h3>
        <Link href='/sign-in'>
        <button className='rounded-lg py-2 px-4 mt-5 bg-black text-white hover:bg-blue-400'> Explore Now </button>
        </Link>
        </div>
        <div className='hidden md:inline-flex md:h-full w-1/2'>
        <Image 
              src={hero} 
              alt=""
              className='object-contain'
              priority= {true}
              />
              </div>
      </section>
<section className='container'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>  
      <div className="col-span-2">
   {/* feed */}
   <PostFeed initialPosts={posts} />

      </div>
     <div className='overflow-hidden col-span-1 h-fit rounded-lg border border-gray-200 order-first md:order-last'>
     <div className='bg-blue-100 px-6 py-4'>
     <p className='font-semibold py-3 flex items-center gap-1.5'>
              Get Started
            </p>
  
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
          <div className='flex justify-between gap-x-4 py-3'>
              <p className="text-zinc-500">
                Find blogs and posts from authors that align with your interests. You can also create one yourself.
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
</section>
      </div>
  )
}

export default GeneralFeed