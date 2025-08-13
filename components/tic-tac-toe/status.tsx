"use client";

export function Status({ current, winner, onNewGame, isDraw }: { current: string; winner: string | null; onNewGame: () => void; isDraw: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center">
        {winner ? (
          <h3 className="text-2xl font-bold text-amber-900">{winner} Wins! 🎉</h3>
        ) : isDraw ? (
          <h3 className="text-2xl font-semibold text-amber-800">It&apos;s a Draw 🤝</h3>
        ) : (
          <h3 className="text-xl text-amber-700">Player {current}&apos;s Turn</h3>
        )}
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-amber-100 text-amber-900 rounded-md" onClick={onNewGame}>New Game</button>
      </div>
    </div>
  );
}
