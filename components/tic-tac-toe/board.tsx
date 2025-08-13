"use client";

import { Cell } from "@/components/tic-tac-toe/cell";
import { cn } from "@/lib/utils";

export function Board({ board, onPlay }: { board: (string | null)[]; onPlay: (i: number) => void }) {
  return (
    <div className={cn("grid grid-cols-3 gap-3 bg-amber-50 p-4 rounded-xl shadow-inner")}>
      {board.map((cell, idx) => (
        <Cell key={idx} value={cell} index={idx} onClick={onPlay} />
      ))}
    </div>
  );
}
