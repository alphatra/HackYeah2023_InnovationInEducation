"use client";

import Image from "next/image";
import { useDeferredValue, useState } from "react";

const universities = [
  {
    id: 1,
    name: "Uniwersytet Wrocławski",
    imagePath: "/uwr.jpg",
    imageCopyrights:
      "Zdjęcie autorstwa Jar.ciurus - Praca własna, CC BY-SA 3.0 pl",
    majors: ["Informatyka", "Fizyka", "Astronomia"],
  },
  {
    id: 2,
    name: "Politechnika Wrocławska",
    imagePath: "/pwr.jpg",
    imageCopyrights:
      "Zdjęcie autorstwa Beata Zdyb - Praca własna, CC BY-SA 3.0 pl",
    majors: ["Informatyka", "Automatyka i robotyka", "Zarządzanie"],
  },
  {
    id: 3,
    name: "Akademia Górniczo-Hutnicza",
    imagePath: "/agh.jpg",
    imageCopyrights: "Zdjęcie autorstwa Maciej Talar / KSAF AGH, CC BY-SA 4.0",
    majors: ["Automatyka", "Geodezja", "Matematyka", "Fizyka"],
  },
  {
    id: 4,
    name: "Politechnika Krakowska",
    imagePath: "/pk.jpg",
    imageCopyrights: "Zdjęcie autorstwa Farmidona - Praca własna, CC BY-SA 3.0",
    majors: ["Architektura", "Mechanika"],
  },
];

export function UniversitiesGrid() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredUniversities = universities.filter(
    (university) =>
      university.name
        .toLocaleLowerCase()
        .includes(deferredQuery.toLocaleLowerCase()) ||
      university.majors.some((major) =>
        major.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase())
      )
  );

  return (
    <>
      <div className="container mt-32 flex flex-col items-center">
        <input
          type="text"
          placeholder="Szukaj..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="bg-gray-200 text-lg w-full max-w-[600px] rounded p-2"
        />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 py-12">
        {filteredUniversities.map((university) => (
          <div
            key={university.id}
            className="border-2 bg-green-100 border-gray-300 rounded-md flex flex-col overflow-hidden"
          >
            <div className="z-0 p-4 relative overflow-hidden rounded-b-xl w-full h-[240px] before:content-[''] before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-radial before:from-transparent before:via-black/50 before:to-black">
              <Image
                alt={`Budynek ${university.name}`}
                src={university.imagePath}
                fill
                className="object-cover"
              />
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-xl text-white z-20 font-medium">
                  {university.name}
                </h3>
                <div className="text-sm z-20 text-gray-300 self-end">
                  {university.imageCopyrights}
                </div>
              </div>
            </div>
            <div className="flex flex-col px-4 py-2 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {university.majors.map((major) => (
                  <div
                    key={major}
                    className="font-mono text-sm font-medium px-2 rounded-full bg-green-200 border border-green-500 py-1"
                  >
                    {major}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
