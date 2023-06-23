import Link from "next/link"
import Logo from "./Logo"
import UserAuthForm from "./UserAuthForm"



const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-xol justify-center space-y06 sm:w-[400px]"> 
       <div className="flex flex-col space-y-2 text-center">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-light">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
            By continuing, you are setting up a Chatter account and agree to 
            our User Agreement and Privacy Policy.
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