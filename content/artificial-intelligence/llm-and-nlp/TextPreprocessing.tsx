"use client";

import { useState, useEffect } from "react";
// SimulationSkeleton removed for smoother demo

// Simple helper functions for the demo
const normalize = (text: string) => text.toLowerCase();
const removePunctuation = (text: string) =>
  text.replace(/[.,!?;:\-_/\\(\\)\[\]{}\"']/g, "");
const tokenize = (text: string) => text.split(/\s+/).filter(Boolean);

export default function TextPreprocessing() {
  const [raw, setRaw] = useState(
    "Hello, World! This is a simple text preprocessing demo."
  );
  const [step, setStep] = useState(0);

  // Run the pipeline step‑by‑step
  const normalized = normalize(raw);
  const noPunct = removePunctuation(normalized);
  const tokens = tokenize(noPunct);

  const steps = [
    { label: "Raw Input", value: raw },
    { label: "Lower‑cased", value: normalized },
    { label: "No Punctuation", value: noPunct },
    { label: "Tokens", value: tokens.join(", ") },
  ];

  // Auto‑advance simulation steps every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <section className="px-12 py-24 max-w-4xl mx-auto bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Text Pre‑processing</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          An interactive simulation of common preprocessing steps.
        </p>
      </header>

      <div className="space-y-6">
        {/* Input area */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">
            Input Text
          </label>
          <textarea
            className="w-full p-3 rounded border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            rows={3}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
        </div>

        {/* Simulation panel */}
        <div className="border border-[var(--border-primary)] rounded p-4 bg-[var(--bg-secondary)]">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
            {steps[step].label}
          </h2>
          {step === 0 ? (
            <p className="text-[var(--text-secondary)]">{steps[step].value}</p>
          ) : step === 3 ? (
            <ul className="list-disc list-inside space-y-1">
              {tokens.map((t, i) => (
                <li key={i} className="text-[var(--text-primary)]">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[var(--text-primary)]">{steps[step].value}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="px-4 py-2 rounded bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-primary)] disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={step === steps.length - 1}
            className="px-4 py-2 rounded bg-[var(--accent-primary)] text-[var(--text-primary)] border border-[var(--accent-primary)] disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Loading placeholder removed – simulation runs instantly */}
        {/* <SimulationSkeleton /> */}
      </div>
    </section>
  );
}
