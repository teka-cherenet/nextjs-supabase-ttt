"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { Board } from "@/components/tic-tac-toe/board";
import { Status } from "@/components/tic-tac-toe/status";
import { useGame } from "@/hooks/use-game";
import { cn } from "@/lib/utils";

export default function Page() {
  const { board, current, winner, isDraw, play, reset } = useGame();

  return (
    <main className={cn("min-h-screen bg-amber-50 p-6 md:p-12 space-y-8")}> 
      <Navigation onNewGame={reset} />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <HeroSection onStart={() => { /* scroll to board */ document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' }) }} />

          <section id="game" className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Game Board</h3>
            <Board board={board} onPlay={play} />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-md">
            <Status current={current} winner={winner} onNewGame={reset} isDraw={isDraw} />
            <div className="mt-4 text-sm text-amber-700">You are playing locally. To enable real-time multiplayer, connect Supabase in the project settings.</div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="font-semibold text-amber-900 mb-2">How to Play</h4>
            <ol className="list-decimal pl-5 text-amber-700">
              <li>Click an empty cell to place your mark.</li>
              <li>Players alternate turns between X and O.</li>
              <li>First to three in a row wins. If board fills, it&apos;s a draw.</li>
            </ol>
          </section>
        </aside>
      </div>

      <footer className="text-center text-sm text-amber-700/80">Made with ❤️ in Nairobi — Mzizi Labs</footer>
    </main>
  );
}
