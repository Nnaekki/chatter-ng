import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { inter} from './fonts'

export const metadata = {
  title: 'Chatter',
  description: 'A Content Publishing Platform to Share and Read Amazing Stories and Articles.',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang='en' 
    className={cn('text-slate-900 antialiased light',
    inter.className
    )}>
      <body className='antialiased'>
        <Providers>
        {/* @ts-expect-error server component */}
        <Navbar />
        {authModal}
        <div className="max-w-7xl mx-auto bg-white">
        {children}
        </div>
        <Toaster />
        </Providers>
        </body>
    </html>
  )
}
