import { Header } from "@/components/header";
import { ArrowDown } from "@/components/icons/arrow-down";
import { Stop } from "@/components/stop";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="relative container mx-auto h-[800px] flex flex-col items-center justify-center">
        <div className="absolute z-0 rounded-b-[50px] overflow-hidden w-full h-full before:content-[''] before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-radial before:from-transparent before:via-black/50 before:to-black">
          <Image alt="People" src="/hero.png" fill className="object-cover" />
        </div>
        <Stop className="w-[200px] md:w-[340px] z-10" />
        <h1 className="text-[48px] md:text-[70px] font-bold relative z-10 text-white text-center w-full leading-tight">
          Examine All Possibilities,
          <br />
          Pick the Best One
        </h1>
        <button className="rounded-full bg-white hover:translate-y-2 transition-all active:bg-gray-50 p-4 justify-between font-mono flex flex-col items-center w-[86px] shadow absolute -bottom-[70px] z-10 h-[140px]">
          Get Started
          <ArrowDown className="h-10" />
        </button>
      </div>
    </main>
  );
}
