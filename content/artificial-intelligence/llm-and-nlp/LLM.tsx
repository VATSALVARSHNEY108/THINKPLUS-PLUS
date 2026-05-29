'use client';

import React, { useState, useEffect } from "react";

/**
 * LLM Visualization – served from the same origin via static export.
 *
 * The llm-viz repo is built as a static export into `public/llm-viz/`.
 * This means the iframe loads from `/llm-viz/llm` on the SAME server
 * (port 3000) — no separate dev server on port 3002 is needed.
 *
 * Build command:  npm run build:llm-viz
 */

const STATIC_PATH = "/llm-viz/llm.html";

export default function LLM() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Quick check that the static build exists
    let alive = true;
    fetch(STATIC_PATH, { mode: "no-cors", cache: "no-store" })
      .then(() => {
        if (alive) setLoaded(true);
      })
      .catch(() => {
        if (alive) setError(true);
      });
    return () => { alive = false; };
  }, []);

  return (
    <section className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 px-6 py-6 md:px-12">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">LLM Visualization</h1>
          <p className="text-base text-[var(--text-secondary)] mt-1">
            Interactive 3D visualization of a GPT-style transformer — walkthrough every layer, attention head, and token embedding.
          </p>
        </div>
        <a
          className="text-sm underline underline-offset-4 text-[var(--text-primary)] hover:text-[var(--text-secondary)] whitespace-nowrap"
          href={STATIC_PATH}
          target="_blank"
          rel="noreferrer"
        >
          Open full screen ↗
        </a>
      </div>

      {/* Error state */}
      {error && (
        <div className="mx-6 md:mx-12 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 mb-6">
          <p className="text-amber-300 font-semibold text-sm">
            ⚠ Could not load the LLM visualization.
          </p>
          <p className="text-[var(--text-secondary)] text-sm mt-2">
            Run <code className="bg-[var(--bg-secondary)] px-2 py-0.5 rounded font-mono text-xs">npm run build:llm-viz</code> to build the static export, then reload this page.
          </p>
        </div>
      )}

      {/* Visualization iframe */}
      <div className="w-full flex-1 relative bg-[var(--bg-secondary)] border-y border-[var(--border-primary)]">
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[var(--bg-primary)]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[var(--text-secondary)]">Loading visualization…</p>
            </div>
          </div>
        )}
        <iframe
          title="LLM Visualization"
          src={STATIC_PATH}
          className="w-full h-[calc(100vh-140px)] min-h-[600px] border-none block"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      </div>

      {/* Attribution */}
      <div className="px-6 py-3 bg-[var(--bg-primary)]">
        <p className="text-xs text-[var(--text-secondary)] text-right opacity-70">
          Visualization by{" "}
          <a
            href="https://github.com/bbycroft/llm-viz"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-[var(--text-primary)]"
          >
            Brendan Bycroft
          </a>
        </p>
      </div>
    </section>
  );
}
