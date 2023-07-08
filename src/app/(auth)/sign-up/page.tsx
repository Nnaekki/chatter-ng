import SignUp from '@/components/SignUp'
import { FC } from 'react'


const page: FC = () => {
  return (
    <div className='absolute inset-0'>
    <div className="relative h-full max-w-2xl mx-auto flex flex-col 
    items-center justify-center pt-20 gap-18">
        <SignUp />
    </div>
  </div>
  )
}

export default page