'use client'

import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
csrfToken?: string;
}

const UserAuthForm: FC<UserAuthFormProps> = ({ csrfToken, className, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {toast} = useToast()

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error) {
            // toast notification
            toast({
                title: 'Error',
                description: 'There was a problem logging in with Google',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }
    const loginWithFacebook = async () => {
        setIsLoading(true)

        try {
            await signIn('facebook')
        } catch (error) {
            // toast notification
            toast({
                title: 'Error',
                description: 'There was a problem logging in with Facebook',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const loginWithTwitter = async () => {
        setIsLoading(true)

        try {
            await signIn('twitter')
        } catch (error) {
            // toast notification
            toast({
                title: 'Error',
                description: 'There was a problem logging in with Twitter',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }
 
    const handleSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        setIsLoading(true)

        try {
            await signIn("credentials", {
                email: data.get('email'),
                password: data.get('password'),
                redirect: false,
            }) 
            
        } catch (error) {
            // toast notification
            toast({
                title: 'Error',
                description: 'There was a problem logging in with your email',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className={cn('flex flex-col gap-3 justify-center', className)} {...props}>
             <form onSubmit={handleSubmit} >

        <label htmlFor="email" className='sr-only'>
          Email
        </label>
        <input id="email" type="email" className="w-[300px] pl-6 mb-4 border mx-auto" required placeholder='Email' />

        <label htmlFor="password" className='sr-only'>
          Password
        </label>
        <input id="password" type="password" className="w-[300px] pl-6 border mx-auto" required placeholder='Password'/>
        <div className="pt-5">
          <Button isLoading={isLoading} size="sm" className="w-full" disabled={isLoading}>
            {isLoading ? null : <Icons.email className="h-4 w-4 mr-2" />}
            Email
            </Button>  
        </div>
            </form>

      
      <div>
                <h1>OR</h1>
            </div>
            <Button 
            onClick={loginWithGoogle} 
            isLoading={isLoading} 
            size='sm' 
            className='w-full'
            disabled={isLoading}>
                {isLoading ? null: <Icons.google className='h-4 w-4 mr-2' />}
            Google
            </Button>

            <Button 
            onClick={loginWithFacebook} 
            isLoading={isLoading} 
            size='sm' 
            className='w-full'
            disabled={isLoading}>
                {isLoading ? null: <Icons.facebook strokeWidth={0.2} fill="#1778F2" className='h-4 w-4 mr-2' />}  
            Facebook
            </Button>

            <Button 
            onClick={loginWithTwitter} 
            isLoading={isLoading} 
            size='sm' 
            className='w-full'
            disabled={isLoading}>
                {isLoading ? null: <Icons.twitter strokeWidth={0.2} fill="#1da1f2" className='h-4 w-4 mr-2' />}  
            Twitter
            </Button>


           

        </div>
    )

}

export default UserAuthForm