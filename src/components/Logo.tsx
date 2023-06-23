// import Link from 'next/link'
import { Rubik_Puddles, Dancing_Script } from "next/font/google";

const iron = Rubik_Puddles({
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const joke = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Logo() {
  return (
    <div className="text-4xl md:text-6xl font-bold">
      <h1 className={iron.className}>
        C<span className={joke.className}>hatter</span>
      </h1>
    </div>
  );
}
