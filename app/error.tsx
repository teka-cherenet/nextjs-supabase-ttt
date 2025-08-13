"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    try {
      const details = error.stack ?? "";
      (window as unknown as { __recordHostError?: (message: string, details: string) => void }).__recordHostError?.(
        error.message,
        details,
      );
      window.parent?.postMessage(
        { type: "host_error", error: error.message, details },
        "*",
      );
    } catch {}
  }, [error]);

  return null;
}
