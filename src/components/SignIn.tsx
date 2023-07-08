import Link from "next/link"
import Logo from "./Logo"
import UserAuthForm from "./UserAuthForm"



const SignIn = () => {
  return (
    <div className="container mx-auto pt-12 flex w-full flex-col justify-center space-y-6 sm:w-[400px]"> 
       <div className="flex flex-col space-y-2 text-center">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
            Sign in to your Chatter account below.
        </p>
        {/* Sign in form */}
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
            New to Chatter? {''}
            <Link href='/sign-up'className="hover:text-blue-500 text-sm underline underline-offset-4">Sign Up</Link>
        </p>
        </div> 
        </div>
  )
}

export default SignIn