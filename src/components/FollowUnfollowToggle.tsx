"use client";

import { FC, startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToBlogPayload } from "@/lib/validators/blog";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface FollowUnfollowToggleProps {
  blogId: string;
  blogName: string;
  isSubscribed: boolean;
}

const FollowUnfollowToggle: FC<FollowUnfollowToggleProps> = ({
  blogId,
  blogName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToBlogPayload = {
        blogId,
      };

      const { data } = await axios.post("/api/blog/subscribe", payload);
      return data as string;
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
      startTransition(() => {
        router.refresh;
        // refresh page without losing state
      });

      return toast({
        title: "Followed",
        description: `You now follow ${blogName}`,
      });
    },
  });
// unfollow logic
  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToBlogPayload = {
        blogId,
      };

      const { data } = await axios.post("/api/blog/unsubscribe", payload);
      return data as string;
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
      startTransition(() => {
        router.refresh;
        // refresh page without losing state
      });

      return toast({
        title: "Unfollowed",
        description: `You no longer follow ${blogName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button 
    isLoading={isUnsubLoading}
    onClick={() => unsubscribe ()}
    className="w-full mt-1 mb-4">
    Unfollow Blog 
    </Button>
  ) : (
    <Button 
    isLoading={isSubLoading}
    onClick={() => subscribe ()}
    className="w-full mt-1 mb-4"> 
    Follow Blog 
    </Button>
  );
};

export default FollowUnfollowToggle;
