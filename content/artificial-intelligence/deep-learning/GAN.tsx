"use client";

import { useEffect, useRef } from "react";

const LOCAL_GAN_LAB_PATH = "/ganlab-site/index.html";

export default function GAN() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        doc.documentElement.style.background = "#ffffff";
        doc.documentElement.style.colorScheme = "light";
        doc.body.style.background = "#ffffff";
        doc.body.style.overflow = "hidden";

        const height = Math.max(
          doc.documentElement.scrollHeight,
          doc.body.scrollHeight,
          1100
        );
        iframe.style.height = `${height}px`;
      } catch {
        // The file is served from /public, so this should stay same-origin.
      }
    };

    iframe.addEventListener("load", syncHeight);
    const timer = window.setInterval(syncHeight, 750);
    window.addEventListener("resize", syncHeight);

    return () => {
      iframe.removeEventListener("load", syncHeight);
      window.removeEventListener("resize", syncHeight);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="w-full px-4 py-8 md:px-8">
      <div className="w-full overflow-hidden border border-[var(--border-primary)] bg-white">
        <iframe
          ref={iframeRef}
          src={LOCAL_GAN_LAB_PATH}
          title="Offline GAN Lab"
          className="w-full bg-white"
          style={{ border: 0, height: "1200px" }}
        />
      </div>
    </section>
  );
}
