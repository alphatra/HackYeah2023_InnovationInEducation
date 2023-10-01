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

const translations: Record<string, string> = {
  lingual: "Lingwistyka",
  medical: "Medycyna",
  technical: "Techniczne",
  art: "Sztuka",
};

export function Results({ data, isLoading, onReset }: ResultsProps) {
  useHotkeys("enter", () => {
    showMore();
  });

  function showMore() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  const sortedCategories = data ? data[1].sort((a, b) => b[1] - a[1]) : [];

  return (
    <main className="flex flex-col gap-8">
      <div className="w-full h-full min-h-screen bg-gradient-to-b relative overflow-hidden from-black to-[#003C31] text-gray-50">
        <div className="container flex flex-col h-screen items-start py-6 gap-6 justify-between">
          <h1 className="text-3xl font-medium">Dopasowanie</h1>

          <div className="flex absolute items-center justify-center max-w-[400px] w-[calc(100%_-_48px)] left-1/2 top-[40%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square">
            <Circle
              size={33}
              position={
                sortedCategories.length > 0
                  ? translations[sortedCategories[0][0]]
                  : "Name"
              }
              isLoading={isLoading}
              duration={8000}
              value={sortedCategories.length > 0 ? sortedCategories[0][1] : 0}
            />
            <Circle
              size={66}
              position={
                sortedCategories.length > 1
                  ? translations[sortedCategories[1][0]]
                  : "Name"
              }
              isLoading={isLoading}
              duration={14000}
              value={sortedCategories.length > 1 ? sortedCategories[1][1] : 0}
            />
            <Circle
              size={100}
              position={
                sortedCategories.length > 2
                  ? translations[sortedCategories[2][0]]
                  : "Name"
              }
              isLoading={isLoading}
              duration={26000}
              value={sortedCategories.length > 2 ? sortedCategories[2][1] : 0}
            />
            <User className="w-16 h-16" />
          </div>

          {!isLoading && (
            <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-between w-full">
              <button
                className="px-3 py-2 rounded text-blue-400 font-medium font-mono items-center disabled:opacity-60 flex gap-2 hover:bg-white/5 transition-colors"
                onClick={() => onReset()}
              >
                Wypełnij ponownie
              </button>
              <div className="text-gray-400 text-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          <div className="border-2 border-gray-300 rounded-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Informatyka</h3>
              <img src="/uwr.svg" className="h-6" alt="UWR Logo" />
            </div>
            <p className="text-gray-600">
              Uniwersytet Wrocławski to czołowa uczelnia w Polsce, związana z
              długą historią i nowoczesnym podejściem do edukacji. Oferuje
              szeroki wybór programów studiów i jest miejscem inspirujących
              badań.
            </p>
            <div className="flex items-center gap-2 flex-row-reverse font-mono text-sm text-gray-600 font-medium">
              <button className="bg-blue-600 font-mono text-sm px-2 py-1 rounded text-white font-medium">
                Więcej
              </button>
            </div>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Automatyka i robotyka</h3>
              <img src="/agh_logo.jpg" className="h-6" alt="AGH Logo" />
            </div>
            <p className="text-gray-600">
              Akademia Górniczo-Hutnicza (AGH) w Krakowie to renomowana uczelnia
              techniczna, znana z doskonałego poziomu kształcenia w dziedzinie
              nauk ścisłych i inżynieryjnych. Oferuje różnorodne programy
              studiów i jest liderem w dziedzinie badań i innowacji.
            </p>
            <div className="flex items-center gap-2 flex-row-reverse font-mono text-sm text-gray-600 font-medium">
              <button className="bg-blue-600 font-mono text-sm px-2 py-1 rounded text-white font-medium">
                Więcej
              </button>
            </div>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Telekomunikacja</h3>
              <img src="/pwr_logo.png" className="h-6" alt="PWR Logo" />
            </div>
            <p className="text-gray-600">
              Politechnika Wrocławska to wiodąca uczelnia techniczna w Polsce.
              Znana z doskonałego poziomu nauki i innowacyjności, oferuje
              szeroki zakres kierunków inżynieryjnych i technicznych.
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
