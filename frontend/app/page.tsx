import { Header } from "@/components/header";
import { ArrowDown } from "@/components/icons/arrow-down";
import { Stop } from "@/components/stop";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="relative container mx-auto h-[800px] flex flex-col gap-4 items-center justify-center">
        <div className="absolute z-0 rounded-b-[50px] overflow-hidden w-full h-full before:content-[''] before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-radial before:from-transparent before:via-black/50 before:to-black">
          <Image alt="People" src="/hero.png" fill className="object-cover" />
        </div>
        <Stop className="w-[200px] md:w-[340px] z-10" />
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

        <button className="rounded-full bg-white hover:translate-y-2 transition-all active:bg-gray-50 p-4 justify-between font-mono flex flex-col items-center w-[86px] shadow absolute -bottom-[70px] z-10 h-[140px]">
          Get Started
          <ArrowDown className="h-10" />
        </button>
      </div>
      <div className="container mt-32 flex flex-col items-center">
        <input
          type="text"
          placeholder="Szukaj..."
          className="bg-gray-200 text-lg w-full max-w-[600px] rounded p-2"
        />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 pt-12">
        <div className="border-2 bg-green-100 border-gray-300 rounded-md flex flex-col overflow-hidden">
          <div className="z-0 p-4 relative overflow-hidden rounded-b-xl w-full h-[240px] before:content-[''] before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-radial before:from-transparent before:via-black/50 before:to-black">
            <Image alt="People" src="/uwr.jpg" fill className="object-cover" />
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-white z-20 font-medium">
                Uniwersytet Wrocławski
              </h3>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 gap-2">
            <div className="flex items-center">
              <div className="font-mono text-sm font-medium px-2 rounded-full bg-green-200 border border-green-500 py-1">
                Informatyka
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 bg-green-100 border-gray-300 rounded-md flex flex-col overflow-hidden">
          <div className="z-0 p-4 relative overflow-hidden rounded-b-xl w-full h-[240px] before:content-[''] before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-radial before:from-transparent before:via-black/50 before:to-black">
            <Image alt="People" src="/pwr.jpg" fill className="object-cover" />
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-white z-20 font-medium">
                Politechnika Wrocławska
              </h3>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 gap-2">
            <div className="flex items-center">
              <div className="font-mono text-sm font-medium px-2 rounded-full bg-green-200 border border-green-500 py-1">
                Informatyka
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
