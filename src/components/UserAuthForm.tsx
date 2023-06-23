'use client'

import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {

}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
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


    return (
        <div className={cn('flex flex-col gap-3 justify-center', className)} {...props}>
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