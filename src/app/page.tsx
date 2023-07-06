import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { getAuthSession } from "@/lib/auth";

export const metadata = {
  title: 'Chatter',
  description: 'A Content Publishing Platform to Share and Read Amazing Stories and Articles.',
}
export default async function Home() {

  const session = await getAuthSession()
  return (
    <div>
             {/* @ts-expect-error server component */}
     {session ? <CustomFeed /> : <GeneralFeed/>}    
     
    </div>
  );
}
