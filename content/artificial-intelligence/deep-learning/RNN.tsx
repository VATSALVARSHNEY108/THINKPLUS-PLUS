"use client";

import { useEffect, useRef } from "react";

export default function RNN() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.documentElement.style.overflow = "hidden";
        doc.body.style.overflow = "hidden";
        const height = Math.max(
          doc.documentElement.scrollHeight,
          doc.body.scrollHeight
        );
        iframe.style.height = `${height}px`;
      } catch {}
    };

    const onLoad = () => syncHeight();
    iframe.addEventListener("load", onLoad);
    const timer = window.setInterval(syncHeight, 500);
    window.addEventListener("resize", syncHeight);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", syncHeight);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="w-full px-4 py-8 md:px-8">
      <div className="w-full border border-[var(--border-primary)] bg-[var(--bg-primary)]">
        <iframe
          ref={iframeRef}
          src="/rnn-explainer/index.html"
          title="RNN Explainer"
          className="w-full"
          style={{ border: 0, height: "1200px" }}
        />
      </div>
    </section>
  );
}
