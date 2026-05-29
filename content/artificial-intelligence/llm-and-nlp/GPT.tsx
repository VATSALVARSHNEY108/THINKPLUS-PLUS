"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

export default function GPT() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Prevent background scrolling in fullscreen mode
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExpanded]);

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <section
        className={`px-12 py-24 max-w-7xl mx-auto flex flex-col gap-8 transition-all duration-300 ${
          isExpanded ? "hidden" : ""
        }`}
      >
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            GPT (Generative Pre-trained Transformer)
          </h1>

          <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-4">
            GPT models are decoder-only transformers trained to predict
            the next token autoregressively. Below is an interactive
            3D/2D visualization of the transformer architecture,
            showing self-attention, masked decoding, and generation
            flow.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            {/* Open in New Tab */}
            <a
              href="/transformer-explainer-site/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-tertiary)] hover:scale-[1.02]"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>

            {/* Expand */}
            <button
              onClick={() => setIsExpanded(true)}
              className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-tertiary)] hover:scale-[1.02]"
            >
              <Maximize2 className="w-4 h-4" />
              Fullscreen
            </button>
          </div>
        </header>

        {/* Normal View */}
        <div className="relative w-full border border-[var(--border-primary)] bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Loading Screen */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
                <p className="text-gray-500 text-sm font-medium">
                  Loading GPT Transformer Explainer…
                </p>
              </div>
            </div>
          )}

          <iframe
            src="/transformer-explainer-site/index.html"
            title="Transformer GPT Explainer"
            className="w-full"
            onLoad={() => setLoaded(true)}
            allow="fullscreen clipboard-read clipboard-write"
            style={{
              border: 0,
              height: "850px",
            }}
          />
        </div>
      </section>

      {/* Fullscreen Mode */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Top Bar */}
          <div className="h-16 border-b border-[var(--border-primary)] bg-white flex items-center justify-between px-6 shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                GPT Transformer Explainer
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Open in New Tab */}
              <a
                href="/transformer-explainer-site/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-tertiary)]"
              >
                <ExternalLink className="w-4 h-4" />
                New Tab
              </a>

              {/* Collapse */}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-tertiary)]"
              >
                <Minimize2 className="w-4 h-4" />
                Exit Fullscreen
              </button>

              {/* Close */}
              <button
                onClick={() => setIsExpanded(false)}
                className="w-10 h-10 rounded-xl border border-[var(--border-primary)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-primary)]" />
              </button>
            </div>
          </div>

          {/* Fullscreen iframe */}
          <div className="flex-1 w-full bg-white">
            <iframe
              src="/transformer-explainer-site/index.html"
              title="Transformer GPT Explainer Fullscreen"
              className="w-full h-full"
              allow="fullscreen clipboard-read clipboard-write"
              style={{
                border: 0,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}