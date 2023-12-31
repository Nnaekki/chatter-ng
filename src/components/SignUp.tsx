import Link from "next/link"
import Logo from "./Logo"
import UserAuthForm from "./UserAuthForm"



const SignUp = () => {
  return (
    <div className="container mx-auto pt-12 flex w-full flex-col justify-center space-y-4 sm:w-[400px]"> 
       <div className="flex flex-col space-y-2 text-center">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm font-light max-w-xs mx-auto">
            By continuing, you are setting up a Chatter account and agree to 
            our User Agreement and Privacy Policy.
        </p>
        {/* Sign up form */}
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
            Already have a Chatter account? {''}
            <Link href='/sign-in'className="hover:text-blue-500 text-sm underline underline-offset-4">Sign In</Link>
        </p>
        </div> 
        </div>
  )
}

export default SignUp