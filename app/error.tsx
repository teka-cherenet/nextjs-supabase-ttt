"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    try {
      const details = error.stack || "";
      const hostWindow = window as Window & {
        __recordHostError?: (message: string, details: string) => void;
      };
      hostWindow.__recordHostError?.(error.message, details);
      hostWindow.parent?.postMessage(
        { type: "host_error", error: error.message, details },
        "*",
      );
    } catch {}
  }, [error]);

  return null;
}
