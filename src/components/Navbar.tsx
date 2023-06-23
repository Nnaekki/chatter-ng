import Link from "next/link";
import { Rubik_Puddles, Dancing_Script } from "next/font/google";
import Logo from "./Logo";


function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 flex justify-between p-5 cursor-pointer max-w-5xl mx-auto h-fit z-[10]">
      <div className="flex items-center space-x-40">
        <Link
          href="/"
          className=" hover:text-blue-400"
        >
        <Logo />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <Link href="/about">
            <h3 className=" hover:text-blue-400">About</h3>
          </Link>
          <Link href="/contact">
            <h3 className=" hover:text-blue-400">Contact</h3>
          </Link>
          <Link href="/write">
            <h3 className=" hover:text-blue-400">Write</h3>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-3 md:space-x-5 text-blue-300 ">
        <Link href="/sign-in">
          <h3 className="font-extralight md:font-normal hover:text-black">
            Sign In
          </h3>
        </Link>
        <Link href="/signup">
          <h3 className="font-extralight md:font-normal bg-black hover:bg-white border px-4 py-2 rounded-lg border-s-blue">
            Get Started
          </h3>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
