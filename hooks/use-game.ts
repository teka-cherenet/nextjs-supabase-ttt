"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = `mzizi-tictactoe-v1`;

export function useGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  useEffect(() => {
    // load from localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.board) {
          setBoard(parsed.board);
          setCurrent(parsed.current ?? "X");
        }
      }
    } catch (e) {
      console.warn("Failed to load game from storage", e);
    }
  }, []);

  useEffect(() => {
    // save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ board, current }));
    } catch (e) {
      console.warn("Failed to save game", e);
    }
  }, [board, current]);

  useEffect(() => {
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
    } else if (board.every(Boolean)) {
      setIsDraw(true);
    } else {
      setIsDraw(false);
    }
  }, [board]);

  const play = useCallback((i: number) => {
    if (winner || isDraw) return;
    setBoard((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = current;
      return next;
    });
    setCurrent((c) => (c === "X" ? "O" : "X"));
  }, [current, winner, isDraw]);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
    setWinner(null);
    setIsDraw(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }, []);

  return { board, current, winner, isDraw, play, reset };
}

function checkWinner(board: (string | null)[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
