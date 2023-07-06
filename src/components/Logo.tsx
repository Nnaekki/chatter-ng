import {rubik_puddles, dancing_script } from "@/app/fonts";

export default function Logo() {
  return (
    <div className="text-4xl md:text-6xl font-bold text-zinc-700">
      <h1 className={rubik_puddles.className}>
        C<span className={dancing_script.className}>hatter</span>
      </h1>
    </div>
  );
}
