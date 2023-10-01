/* eslint-disable @next/next/no-img-element */
"use client";

import { Circle } from "@/components/circle";
import { User } from "@/components/icons/user";
import { ResultsData } from "@/types/common";
import { useHotkeys } from "react-hotkeys-hook";

type ResultsProps = {
  isLoading: boolean;
  data: ResultsData;
  onReset: () => void;
};

export function Results({ isLoading, onReset }: ResultsProps) {
  useHotkeys("enter", () => {
    showMore();
  });

  function showMore() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="w-full h-full min-h-screen bg-gradient-to-b from-black to-[#003C31] text-gray-50">
        <div className="container flex flex-col items-start py-6 gap-6">
          <h1 className="text-3xl font-medium">Dopasowanie</h1>

          <div className="flex relative items-center justify-center max-w-[400px] w-full self-center h-[600px]">
            <Circle
              size={32}
              position="Engineer"
              isLoading={isLoading}
              duration={8000}
            />
            <Circle
              size={70}
              position="Medic"
              isLoading={isLoading}
              duration={14000}
              isReverse={true}
            />
            <Circle
              size={100}
              position="Physics"
              isLoading={isLoading}
              duration={26000}
            />
            <User className="w-16 h-16" />
          </div>

          {!isLoading && (
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
              <button
                className="px-3 py-2 rounded text-blue-400 font-medium font-mono items-center disabled:opacity-60 flex gap-2 hover:bg-white/5 transition-colors"
                onClick={() => onReset()}
              >
                Wypełnij ponownie
              </button>
              <div className="text-gray-400">
                Im bliżej jest zawód, tym większe jest dopasowanie
              </div>
              <button
                className="bg-white/90 px-3 py-2 rounded text-black/90 font-medium font-mono items-center disabled:opacity-60 flex gap-2 hover:bg-white/80 transition-all"
                onClick={() => showMore()}
              >
                Pokaż więcej
                <div className="font-mono hidden md:flex font-medium text-sm bg-black/20 text-black/90 h-6  items-center px-1 rounded">
                  Enter
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="container flex flex-col gap-6">
        <h1 className="text-3xl font-medium">Kierunki</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-gray-300 rounded-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Informatyka</h3>
              <img src="/uwr.svg" className="h-6" alt="UWR" />
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus ea commodi sapiente perferendis eligendi libero vel
              rerum dolor minus nostrum. Qui modi sed, laborum ipsam
              exercitationem facilis odit accusantium quo.
            </p>
            <div className="flex items-center gap-2 flex-row-reverse font-mono text-sm text-gray-600 font-medium">
              <button className="bg-blue-600 font-mono text-sm px-2 py-1 rounded text-white font-medium">
                Więcej
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
