"use client";

import { ArrowDown } from "@/components/icons/arrow-down";

export function ShowMoreButton() {
  function showMore() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }
  return (
    <button
      className="rounded-full bg-white hover:translate-y-2 transition-all active:bg-gray-50 p-4 justify-between font-mono flex flex-col items-center w-[86px] shadow absolute -bottom-[70px] z-10 h-[140px]"
      onClick={() => showMore()}
    >
      Get Started
      <ArrowDown className="h-10" />
    </button>
  );
}
