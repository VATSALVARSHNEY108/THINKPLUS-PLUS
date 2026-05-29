'use client';

import React from "react";
import { Info, Cpu, Network, Layers, ArrowLeftRight, BookOpen } from "lucide-react";

export default function BERT() {
  return (
    <section className="w-full min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <div className="w-full border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 pt-20 pb-16 px-6 md:px-12 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Network className="w-3.5 h-3.5" /> LLM and NLP
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight">
            BERT
          </h1>
          <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed font-light">
            Bidirectional Encoder Representations from Transformers. Discover how reading text in both directions revolutionizes language understanding.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-24">
        
        {/* Core Concepts Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Core Innovations</h2>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concept 1 */}
            <div className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-8 hover:bg-[var(--bg-secondary)] transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <ArrowLeftRight className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Bidirectional Context</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                Unlike previous models that read text sequentially (left-to-right or right-to-left), BERT processes all words in a sentence simultaneously. This allows it to understand the full context of a word based on its surroundings.
              </p>
            </div>

            {/* Concept 2 */}
            <div className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-8 hover:bg-[var(--bg-secondary)] transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Masked Language Modeling (MLM)</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                During training, 15% of the words are randomly masked out. BERT is forced to predict these hidden words based on the context provided by the non-masked words, building a deep understanding of grammar and syntax.
              </p>
            </div>

            {/* Concept 3 */}
            <div className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-8 hover:bg-[var(--bg-secondary)] transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Next Sentence Prediction (NSP)</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                BERT learns relationships between sentences by predicting whether two given sentences logically follow one another. This is crucial for tasks like Q&A and natural language inference.
              </p>
            </div>

            {/* Concept 4 */}
            <div className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-8 hover:bg-[var(--bg-secondary)] transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Transformer Encoder</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                BERT discards the decoder part of the original Transformer architecture. It relies entirely on stacked Encoder layers (12 for BERT-Base, 24 for BERT-Large) utilizing multi-head self-attention.
              </p>
            </div>
          </div>
        </div>

        {/* Simulation Section */}
        <div className="relative">
          <div className="absolute -inset-x-6 md:-inset-x-12 -inset-y-12 bg-gradient-to-b from-[var(--bg-secondary)]/50 to-transparent -z-10 rounded-[3rem]" />
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-500 rounded-full" />
                Attention Visualization
              </h2>
              <p className="mt-4 text-[var(--text-secondary)]">
                Dive inside the model's brain. This interactive visualization lets you explore how individual attention heads in different layers link tokens together. Notice how some heads focus on syntax (like tracking pronouns), while others capture semantic relationships.
              </p>
            </div>
            <a 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              href="/nlp-simulations/bert-attention.html" 
              target="_blank" 
              rel="noreferrer"
            >
              Expand view ↗
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-primary)] shadow-2xl ring-1 ring-black/5">
            <div className="h-10 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              <div className="ml-4 px-3 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] flex items-center gap-2">
                <Info className="w-3 h-3" />
                bert-attention-explorer
              </div>
            </div>
            
            <iframe
              title="BERT Attention Visualization"
              src="/nlp-simulations/bert-attention.html"
              className="w-full h-[75vh] min-h-[600px] border-none bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups"
            />
          </div>
          
          <div className="mt-6 flex items-start gap-4 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-400" />
            <div className="text-sm leading-relaxed">
              <strong className="text-indigo-300 block mb-1">Pro Tip for Exploration:</strong>
              Click on different layers (top row) and heads (colored boxes) in the visualization above. Try hovering over the word <code>"it"</code> to see which other words the model is paying attention to in order to resolve the pronoun reference.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
