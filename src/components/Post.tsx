import { Post, Bookmark, User, Vote } from "@prisma/client";
import { FC, useRef } from "react";
import Image from "next/image";
import { formatTimeToNow } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import BookmarkClient from "./bookmark/BookmarkClient";


type PartialVote = Pick<Vote, 'type'>


interface PostProps {
  blogName: string;
  post: Post & {
    author: User;
    votes: Vote[];
    bookmarks: Bookmark[];
  };
  votesAmt: number;
  commentAmt: number;
  currentVote?: PartialVote
  onBookmark?: () => void;
  isBookmarked: boolean;

}

const Post: FC<PostProps> = ({
  blogName,
  post,
  votesAmt,
  commentAmt,
  currentVote,
  onBookmark,
  isBookmarked,

}) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-60 mt-1 text-xs text-gray-500">
            <div className="flex justify-between">
              {blogName ? (
                <>
                  <a
                    className="underline text-zinc-900 text-sm underline-offset-2"
                    href={`/r/${blogName}`}
                  >
                    {blogName}
                  </a>
                </>
              ) : null}
              {/* <span className="px-1">•</span> */}
              <div className="flex gap-2">
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    className="object-fit rounded-full"
                    height={40}
                    width={40}
                    alt=""
                  />
                )}
                <div>
                  <span className="flex">Posted by {post.author.username}</span>
                  {""}
                  {formatTimeToNow(new Date(post.createdAt))}
                </div>
              </div>
            </div>

            <a href={`/r/${blogName}/post/${post.id}`}>
              <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                {post.title}
              </h1>
            </a>
            <div
              className="relative text-sm max-h-40 w-full overflow-clip"
              ref={pRef}
            >
              <EditorOutput content={post.content} />

              {pRef.current?.clientHeight === 160 ? (
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6 flex justify-between">
        <a
          className="flex w-fit items-center gap-2"
          href={`/r/${blogName}/post/${post.id}`}
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </a>
        <span>
        <PostVoteClient postId={post.id} initialVote={currentVote?.type} initialVotesAmt={votesAmt} />
        </span>
        <span >
          <BookmarkClient postId={post.id} isBookmarked={isBookmarked} />
        </span>
      </div>
    </div>
  );
};

export default Post;
