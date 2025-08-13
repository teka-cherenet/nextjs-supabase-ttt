"use client";

import { cn } from "@/lib/utils";

export function Cell({ value, index, onClick }: { value: string | null; index: number; onClick: (i: number) => void }) {
  return (
    <button
      aria-label={`Cell ${index}`}
      className={cn("w-24 h-24 md:w-28 md:h-28 flex items-center justify-center text-4xl md:text-5xl font-bold rounded-lg transition-transform shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white")}
      onClick={() => onClick(index)}
    >
      {value}
    </button>
  );
}
