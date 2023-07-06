'use client'

import { useCustomToast } from "@/hooks/use-custom-toast";
import { FC } from "react";
import { Button } from "../ui/Button";
import { Bookmark } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

interface BookmarkClientProps {
  postId: string;
  isBookmarked: boolean;
  onBookmark?: () => void;
}

const BookmarkClient: FC<BookmarkClientProps> = ({
  postId,
  isBookmarked,
  onBookmark,
}) => {
  const { loginToast } = useCustomToast();

  const { mutate: bookmark, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch("/api/blog/post/bookmark", { postId });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem.",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      onBookmark?.();
      return toast({
        title: isBookmarked ? "Unbookmarked" : "Bookmarked",
        description: isBookmarked
          ? "You have successfully removed this post from your bookmarks"
          : "You have successfully added this post to your bookmarks",
      });
    },
  });

  return (
    <div className="flex w-fit items-center gap-2">
      <Button
        onClick={() => bookmark()}
        isLoading={isLoading}
        size="sm"
        variant="ghost"
        aria-label="bookmark"
      >
        <Bookmark
          className={isBookmarked ? "h-5 w-5 text-black fill-black" : "h-5 w-5"}
        />
      </Button>
    </div>
  );
};

export default BookmarkClient;
