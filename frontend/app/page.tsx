import { Header } from "@/components/header";
import { ShowMoreButton } from "@/components/show-more-button";
import { Stop } from "@/components/stop";
import { UniversitiesGrid } from "@/components/universities-grid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="relative container mx-auto max-h-[800px] h-[calc(100vh_-_6rem)] flex flex-col gap-4 items-center justify-center">
        <div className="absolute z-0 rounded-b-[50px] overflow-hidden w-full h-full before:content-[''] before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-radial before:from-transparent before:via-black/50 before:to-black">
          <Image alt="People" src="/hero.png" fill className="object-cover" />
        </div>
        <Stop className="w-[200px] md:w-[340px] z-10 opacity-80 animate-scale-down" />
        <h1 className="text-[48px] md:text-[70px] font-bold relative z-10 text-white text-center w-full leading-tight">
          Examine All Possibilities,
          <br />
          Pick the Best One
        </h1>

        <Link
          href="/survey"
          className="bg-blue-600 z-10 px-3 py-2 rounded text-white/90 font-medium font-mono items-center disabled:opacity-60 flex gap-2 hover:bg-blue-500 transition-all"
        >
          Otwórz ankietę
        </Link>
        <ShowMoreButton />
      </div>
      <UniversitiesGrid />
    </main>
  );
}
