"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation({ onNewGame }: { onNewGame: () => void }) {
  return (
    <header className={cn("w-full flex items-center justify-between py-6 px-6 md:px-12 bg-gradient-to-r from-amber-50 to-amber-100")}>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-amber-600 text-white w-10 h-10 flex items-center justify-center font-bold shadow-lg">TTT</div>
        <div>
          <h1 className="text-lg font-semibold text-amber-900">Mzizi Tic-Tac-Toe</h1>
          <p className="text-sm text-amber-700/80">Play real-time or locally — made with ❤️ in Africa</p>
        </div>
      </div>
      <nav className="flex items-center gap-3">
        <Button onClick={onNewGame} variant="outline">New Game</Button>
        <Button onClick={() => { window.location.reload(); }} variant="ghost">Reset UI</Button>
      </nav>
    </header>
  );
}
