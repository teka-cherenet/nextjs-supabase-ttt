// Host Error Bridge - injected via webpack entry to avoid user-land edits
// Guards against double-installation
(() => {
  if (typeof window === "undefined") return;
  if ((window as any).__hostErrorBridgeInstalled) return;
  (window as any).__hostErrorBridgeInstalled = true;

  const postHostError = (message: string, details?: string) => {
    try {
      const summary = String(message || "Error");
      const det = details ? String(details) : "";
      (window as any).__lastHostError = { error: summary, details: det };
      window.parent?.postMessage(
        { type: "host_error", error: summary, details: det },
        "*",
      );
    } catch {}
  };

  // Global error handler
  window.addEventListener("error", (event) => {
    try {
      const message = event.message || String(event.error || "Unknown error");
      const stack = (event.error && (event.error as any).stack) || "";
      postHostError(message, stack);
    } catch {}
  });

  // Unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    try {
      const reason = (event as any).reason;
      const message =
        (reason && (reason.message || String(reason))) ||
        "Unhandled promise rejection";
      const stack = (reason && reason.stack) || "";
      postHostError(message, stack);
    } catch {}
  });

  // Respond to host requests
  window.addEventListener("message", (event) => {
    const data = (event as any).data;
    if (data && data.type === "host_request_error") {
      try {
        const lastError = (window as any).__lastHostError as
          | { error: string; details?: string }
          | undefined;
        if (lastError) {
          window.parent?.postMessage({ type: "host_error", ...lastError }, "*");
        } else {
          window.parent?.postMessage({ type: "pong" }, "*");
        }
      } catch {}
    }
    if (data && data.type === "host_ready") {
      window.parent?.postMessage({ type: "pong" }, "*");
    }
  });

  // Capture console.error to provide more verbose details
  try {
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      try {
        const msg = args
          .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
          .join(" \n");
        if (
          /error|exception|failed|cannot|undefined|not found|TypeError|ReferenceError|hydration/i.test(
            msg,
          )
        ) {
          const errObj = (args as any[]).find((a) => a && (a as any).stack);
          const stack =
            (errObj && (errObj as any).stack) || new Error().stack || "";
          postHostError(msg, stack);
        }
      } catch {}
      originalConsoleError.apply(console, args as any);
    };
  } catch {}

  // Observe Next.js error overlay and forward its content as details
  try {
    const observer = new MutationObserver(() => {
      try {
        const portal = document.getElementById("nextjs-portal-root");
        const overlay = document.querySelector("[data-nextjs-error-overlay]");
        const container = portal || overlay;
        if (!container) return;
        const text = container.textContent || "";
        if (!text) return;
        if (
          /Hydration failed|Text content does not match|Hydration error/i.test(
            text,
          )
        ) {
          // Post hydration errors to host for proper handling
          const compact = text.split("\n").slice(0, 200).join("\n");
          postHostError("Hydration error detected", compact);
          return;
        }
        const compact = text.split("\n").slice(0, 200).join("\n");
        postHostError("Runtime error detected", compact);
      } catch {}
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    (window as any).__nextOverlayObserver = observer;
  } catch {}
})();
