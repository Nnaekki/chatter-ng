"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import {useRouter} from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateBlogPayload } from "@/lib/validators/blog";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

export const metadata = {
  title: 'Chatter',
  description: 'A Content Publishing Platform to Share and Read Amazing Stories and Articles.',
}

const Page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter()
  const {loginToast} = useCustomToast()

  const {mutate: createBlog, isLoading} = useMutation({
    mutationFn: async () => {
      const payload: CreateBlogPayload = {
        name: input,
      }
      const {data} = await axios.post('/api/blog', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toast({
            title: 'Blog name alreasy exists',
            description: 'Please choose a different blog name.',
            variant: 'destructive',
          })
      
        }
        if(err.response?.status === 422){
          return toast({
            title: 'Invalid blog name',
            description: 'Please choose a name between 3 and 21 characters.',
            variant: 'destructive',
          })
        }
        if(err.response?.status === 401){
          return loginToast ()
        
        }
      }

      toast({
        title: 'There was an error',
        description: 'Could not create Chatter blog'
      })
    },

    onSuccess: (data) => {
      router.push(`/r/${data}`)
    }
  })


  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto pt-10">
      <div className="relative bg-slate-100 w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Chatter Blog</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />
        <div className="space-y-2">
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Blog names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">

          <Button variant='subtle' onClick={() => router.back()}>
            Cancel
            </Button>
            <Button 
            isLoading={isLoading} 
            disabled={input.length === 0}
            onClick={() => createBlog()}
            >
              Create Blog
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
