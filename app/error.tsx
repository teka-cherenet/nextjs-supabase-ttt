"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      const details = error.stack || "";
      (window as any).__recordHostError?.(error.message, details);
      window.parent?.postMessage(
        { type: "host_error", error: error.message, details },
        "*",
      );
    } catch {}
  }, [error]);

  return null;
}
