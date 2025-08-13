"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className={cn("py-12 px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-b from-white to-amber-50 rounded-lg shadow-sm")}>
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-extrabold text-amber-900 leading-tight mb-4">Tic-Tac-Toe — Kisasa &amp; Charming</h2>
        <p className="text-amber-700/90 mb-6 max-w-xl">A modern, responsive tic-tac-toe experience inspired by African color and rhythm. Play locally or connect with a friend for real-time matches.</p>
        <div className="flex items-center gap-3">
          <Button onClick={onStart}>Start Playing</Button>
          <Button variant="outline" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })}>Explore Features</Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-to-br from-amber-200/80 to-amber-50 rounded-2xl shadow-2xl flex items-center justify-center">
          <div className="text-6xl font-extrabold text-amber-800 opacity-90">X O</div>
        </div>
      </div>
    </section>
  );
}
