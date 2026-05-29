"use client";

import React, { useState } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";

export default function RAG() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="px-12 py-24 max-w-7xl mx-auto flex flex-col gap-8">
      <header className="max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-5 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[var(--text-secondary)]">
          <span className="inline-block size-2 rounded-full bg-[var(--text-primary)]" />
          Generative AI
        </div>
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-[var(--text-primary)] mb-6">
          RAG (Retrieval-Augmented Generation)
        </h1>
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-4">
          Retrieval-Augmented Generation (RAG) optimizes LLM outputs by querying authoritative external knowledge bases before generating responses. Explore real-time vector lookups, prompt augmentation, and synthesis flows in the sandbox below.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <a
            href="/simulations/live-simulation-studio/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--text-primary)] hover:underline flex items-center gap-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-[var(--text-primary)] hover:underline flex items-center gap-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </header>

      <div
        className={`w-full border border-[var(--border-primary)] bg-white rounded-2xl overflow-hidden mt-6 shadow-2xl transition-all duration-300 relative ${
          isExpanded ? "fixed inset-4 z-50 mt-0 rounded-xl" : ""
        }`}
      >
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
              <p className="text-gray-500 text-sm font-medium">
                Loading RAG Simulation Studio…
              </p>
            </div>
          </div>
        )}

        <iframe
          src="/simulations/live-simulation-studio/index.html"
          title="Live Simulation Studio"
          className="w-full"
          onLoad={() => setLoaded(true)}
          style={{
            border: 0,
            height: isExpanded ? "100%" : "800px",
            minHeight: isExpanded ? "100%" : "800px",
            colorScheme: "light",
          }}
        />
      </div>

      {/* Fullscreen overlay backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </section>
  );
}
