import Link from "next/link";
import Logo from "./Logo";
import { getAuthSession } from "@/lib/auth";
import ProfileNav from "./ProfileNav";
import SearchBar from "./SearchBar";


const Navbar = async () => {

  const session = await getAuthSession ()

  return (
    <div className="fixed max-w-7xl mx-auto top-0 inset-x-0 bg-white flex justify-between p-2 py-5 md:px-20 cursor-pointer h-fit z-[10] shadow-md shadow-gray-600">
      <div className="h-full flex items-center space-x-40">
        <Link
          href="/"
          className=" hover:text-zinc-400 flex gap-2 items-center"
        >
        <Logo />

        </Link>
        <div className='inline-flex items-center sm:w-1/2'>

        <SearchBar  />
</div>
      </div>
      {session?.user ? (
      <ProfileNav user={session.user} />
      ) : (
          <div className="flex items-center space-x-3 md:space-x-5 text-zinc-700">
              <Link href="/sign-in">
                <h3 className="font-extralight md:font-normal hover:text-zinc-300">
                  Sign In
                </h3>
              </Link>
              <Link href="/sign-up">
                <h3 className="font-extralight md:font-normal bg-zinc-300 hover:bg-zinc-100 border px-4 py-2 rounded-lg border-s-blue">
                  Get Started
                </h3>
              </Link>
            </div>
        )
    }
        </div>

  );
}

export default Navbar;
