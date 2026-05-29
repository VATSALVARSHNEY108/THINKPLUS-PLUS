"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Brain, Cable, RotateCcw, Sigma } from "lucide-react";

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}
function round3(x: number) {
  return Math.round(x * 1000) / 1000;
}
function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}
function tanh(x: number) {
  const e2x = Math.exp(2 * x);
  return (e2x - 1) / (e2x + 1);
}

type Model = "GRU" | "LSTM";

type Scalars = {
  // input and recurrent weights (1D toy)
  W: number;
  U: number;
  b: number;
};

type GateScalars = {
  // gates are separate
  gate1: Scalars; // update (z) or forget (f)
  gate2: Scalars; // reset (r) or input (i)
  gate3: Scalars; // only for LSTM: output (o)
  cand: Scalars; // candidate h~ or g
};

const DEFAULT_GRU: GateScalars = {
  gate1: { W: 2.2, U: 1.0, b: 0.0 }, // z
  gate2: { W: 2.0, U: 1.2, b: 0.0 }, // r
  gate3: { W: 0, U: 0, b: 0 }, // unused
  cand: { W: 1.6, U: 1.4, b: 0.0 },
};

const DEFAULT_LSTM: GateScalars = {
  gate1: { W: 2.0, U: 1.2, b: 0.0 }, // f
  gate2: { W: 2.0, U: 1.0, b: 0.0 }, // i
  gate3: { W: 2.0, U: 1.0, b: 0.0 }, // o
  cand: { W: 1.6, U: 1.2, b: 0.0 }, // g
};

function parseSequence(text: string) {
  // allow comma/space separated, keep small, default to 0/1-ish values
  const parts = text
    .split(/[\s,]+/g)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 20);
  const xs = parts.map((p) => Number(p)).filter((n) => Number.isFinite(n));
  return xs.length ? xs : [0, 0, 1, 0, 0, 0, 1, 0];
}

function score({ W, U, b }: Scalars, x: number, hPrev: number) {
  return W * x + U * hPrev + b;
}

function simulateGRU(xs: number[], p: GateScalars, h0: number) {
  let h = h0;
  const rows: Array<{
    t: number;
    x: number;
    z: number;
    r: number;
    hCand: number;
    h: number;
  }> = [];
  for (let t = 0; t < xs.length; t++) {
    const x = xs[t];
    const z = sigmoid(score(p.gate1, x, h));
    const r = sigmoid(score(p.gate2, x, h));
    const hCand = tanh(score(p.cand, x, r * h));
    h = (1 - z) * h + z * hCand;
    rows.push({ t, x, z, r, hCand, h });
  }
  return rows;
}

function simulateLSTM(xs: number[], p: GateScalars, h0: number, c0: number) {
  let h = h0;
  let c = c0;
  const rows: Array<{
    t: number;
    x: number;
    f: number;
    i: number;
    o: number;
    g: number;
    c: number;
    h: number;
  }> = [];
  for (let t = 0; t < xs.length; t++) {
    const x = xs[t];
    const f = sigmoid(score(p.gate1, x, h));
    const i = sigmoid(score(p.gate2, x, h));
    const o = sigmoid(score(p.gate3, x, h));
    const g = tanh(score(p.cand, x, h));
    c = f * c + i * g;
    h = o * tanh(c);
    rows.push({ t, x, f, i, o, g, c, h });
  }
  return rows;
}

function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] p-3">
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="text-[var(--text-secondary)]">{label}</div>
        <div className="font-mono text-[var(--text-primary)]">{round3(value)}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--text-primary)]"
      />
    </div>
  );
}

export default function LSTM_GRU() {
  const [model, setModel] = useState<Model>("GRU");
  const [seqText, setSeqText] = useState("0, 0, 1, 0, 0, 0, 1, 0");
  const [h0, setH0] = useState(0);
  const [c0, setC0] = useState(0);

  const [gru, setGru] = useState<GateScalars>(DEFAULT_GRU);
  const [lstm, setLstm] = useState<GateScalars>(DEFAULT_LSTM);

  const xs = useMemo(() => parseSequence(seqText), [seqText]);

  const simGRU = useMemo(() => simulateGRU(xs, gru, h0), [xs, gru, h0]);
  const simLSTM = useMemo(() => simulateLSTM(xs, lstm, h0, c0), [xs, lstm, h0, c0]);

  const reset = () => {
    setModel("GRU");
    setSeqText("0, 0, 1, 0, 0, 0, 1, 0");
    setH0(0);
    setC0(0);
    setGru(DEFAULT_GRU);
    setLstm(DEFAULT_LSTM);
  };

  const params = model === "GRU" ? gru : lstm;
  const setParams = model === "GRU" ? setGru : setLstm;

  return (
    <div className="flex flex-col gap-12 px-12 py-24 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-mono border border-[var(--border-primary)] px-3 py-1 rounded-full bg-[var(--bg-secondary)]">
          Deep Learning
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          LSTM vs GRU
        </h1>
        <p className="mt-4 text-xl text-[var(--text-secondary)] leading-relaxed max-w-4xl">
          LSTMs and GRUs fix vanilla RNNs by adding <strong>gates</strong>—learned switches that control what to remember and what to overwrite.
          This page gives you a hands-on, 1D “gate playground” so you can see memory behavior over time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Choose a cell</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setModel("GRU")}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  model === "GRU"
                    ? "border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    : "border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]"
                }`}
              >
                GRU
              </button>
              <button
                onClick={() => setModel("LSTM")}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  model === "LSTM"
                    ? "border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    : "border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]"
                }`}
              >
                LSTM
              </button>
            </div>

            <div className="mt-5 text-sm text-[var(--text-secondary)] leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>GRU</strong> keeps one state \(h_t\) and uses <strong>update</strong> \(z_t\) and <strong>reset</strong> \(r_t\).
                </li>
                <li>
                  <strong>LSTM</strong> keeps hidden state \(h_t\) and a separate <strong>cell</strong> \(c_t\) with
                  <strong> forget</strong> \(f_t\), <strong>input</strong> \(i_t\), <strong>output</strong> \(o_t\).
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                <Brain className="h-4 w-4" />
                <span>Inputs</span>
              </div>
              <button
                onClick={reset}
                className="text-xs font-semibold rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 hover:bg-[var(--bg-secondary)]"
              >
                <RotateCcw className="inline-block h-4 w-4 mr-2" />
                Reset
              </button>
            </div>

            <label className="mt-4 block text-xs text-[var(--text-secondary)]">
              Sequence \(x_t\) (comma/space separated, max 20)
            </label>
            <textarea
              value={seqText}
              onChange={(e) => setSeqText(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] font-mono outline-none"
            />

            <div className="mt-4 grid gap-3">
              <Slider label="Initial hidden h₀" value={h0} setValue={setH0} min={-1} max={1} step={0.01} />
              {model === "LSTM" ? (
                <Slider label="Initial cell c₀" value={c0} setValue={setC0} min={-1} max={1} step={0.01} />
              ) : null}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <Sigma className="h-4 w-4" />
              <span>Gate playground (1D toy)</span>
            </div>
            <h2 className="mt-2 text-lg font-bold text-[var(--text-primary)]">Tune gate weights and watch memory change</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              We use a 1D hidden state so you can see the exact numbers. Each gate is computed as:
              <span className="font-mono"> gate = σ(W·x + U·h + b)</span> and candidates use <span className="font-mono">tanh</span>.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  <Cable className="h-4 w-4" />
                  <span>{model === "GRU" ? "Update gate z" : "Forget gate f"}</span>
                </div>
                <div className="mt-3 grid gap-3">
                  <Slider
                    label="W"
                    value={params.gate1.W}
                    setValue={(v) => setParams((p) => ({ ...p, gate1: { ...p.gate1, W: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                  <Slider
                    label="U"
                    value={params.gate1.U}
                    setValue={(v) => setParams((p) => ({ ...p, gate1: { ...p.gate1, U: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                  <Slider
                    label="b"
                    value={params.gate1.b}
                    setValue={(v) => setParams((p) => ({ ...p, gate1: { ...p.gate1, b: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  <Cable className="h-4 w-4" />
                  <span>{model === "GRU" ? "Reset gate r" : "Input gate i"}</span>
                </div>
                <div className="mt-3 grid gap-3">
                  <Slider
                    label="W"
                    value={params.gate2.W}
                    setValue={(v) => setParams((p) => ({ ...p, gate2: { ...p.gate2, W: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                  <Slider
                    label="U"
                    value={params.gate2.U}
                    setValue={(v) => setParams((p) => ({ ...p, gate2: { ...p.gate2, U: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                  <Slider
                    label="b"
                    value={params.gate2.b}
                    setValue={(v) => setParams((p) => ({ ...p, gate2: { ...p.gate2, b: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                </div>
              </div>

              {model === "LSTM" ? (
                <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    <Cable className="h-4 w-4" />
                    <span>Output gate o</span>
                  </div>
                  <div className="mt-3 grid gap-3">
                    <Slider
                      label="W"
                      value={params.gate3.W}
                      setValue={(v) => setParams((p) => ({ ...p, gate3: { ...p.gate3, W: v } }))}
                      min={-4}
                      max={4}
                      step={0.05}
                    />
                    <Slider
                      label="U"
                      value={params.gate3.U}
                      setValue={(v) => setParams((p) => ({ ...p, gate3: { ...p.gate3, U: v } }))}
                      min={-4}
                      max={4}
                      step={0.05}
                    />
                    <Slider
                      label="b"
                      value={params.gate3.b}
                      setValue={(v) => setParams((p) => ({ ...p, gate3: { ...p.gate3, b: v } }))}
                      min={-4}
                      max={4}
                      step={0.05}
                    />
                  </div>
                </div>
              ) : null}

              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  <Cable className="h-4 w-4" />
                  <span>{model === "GRU" ? "Candidate h~" : "Candidate g"}</span>
                </div>
                <div className="mt-3 grid gap-3">
                  <Slider
                    label="W"
                    value={params.cand.W}
                    setValue={(v) => setParams((p) => ({ ...p, cand: { ...p.cand, W: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                  <Slider
                    label="U"
                    value={params.cand.U}
                    setValue={(v) => setParams((p) => ({ ...p, cand: { ...p.cand, U: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                  <Slider
                    label="b"
                    value={params.cand.b}
                    setValue={(v) => setParams((p) => ({ ...p, cand: { ...p.cand, b: v } }))}
                    min={-4}
                    max={4}
                    step={0.05}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <Sigma className="h-4 w-4" />
              <span>Rollout</span>
            </div>
            <h2 className="mt-2 text-lg font-bold text-[var(--text-primary)]">Step-by-step values</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Focus on the gates: when a gate is near 0, it blocks information; near 1, it passes it through.
              A good “memory” behavior usually needs a <strong>high forget</strong> (keep \(c\)) and <strong>low input</strong> (avoid overwriting) until a key token arrives.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]">
              <table className="w-full text-xs">
                <thead className="text-[var(--text-secondary)]">
                  {model === "GRU" ? (
                    <tr className="border-b border-[var(--border-primary)]">
                      <th className="p-3 text-left font-semibold">t</th>
                      <th className="p-3 text-left font-semibold">x</th>
                      <th className="p-3 text-left font-semibold">z</th>
                      <th className="p-3 text-left font-semibold">r</th>
                      <th className="p-3 text-left font-semibold">h~</th>
                      <th className="p-3 text-left font-semibold">h</th>
                    </tr>
                  ) : (
                    <tr className="border-b border-[var(--border-primary)]">
                      <th className="p-3 text-left font-semibold">t</th>
                      <th className="p-3 text-left font-semibold">x</th>
                      <th className="p-3 text-left font-semibold">f</th>
                      <th className="p-3 text-left font-semibold">i</th>
                      <th className="p-3 text-left font-semibold">o</th>
                      <th className="p-3 text-left font-semibold">g</th>
                      <th className="p-3 text-left font-semibold">c</th>
                      <th className="p-3 text-left font-semibold">h</th>
                    </tr>
                  )}
                </thead>
                <tbody className="text-[var(--text-primary)] font-mono">
                  {model === "GRU"
                    ? simGRU.map((r) => (
                        <tr key={r.t} className="border-b border-[var(--border-primary)] last:border-b-0">
                          <td className="p-3">{r.t}</td>
                          <td className="p-3">{round3(r.x)}</td>
                          <td className="p-3">{round3(r.z)}</td>
                          <td className="p-3">{round3(r.r)}</td>
                          <td className="p-3">{round3(r.hCand)}</td>
                          <td className="p-3">{round3(r.h)}</td>
                        </tr>
                      ))
                    : simLSTM.map((r) => (
                        <tr key={r.t} className="border-b border-[var(--border-primary)] last:border-b-0">
                          <td className="p-3">{r.t}</td>
                          <td className="p-3">{round3(r.x)}</td>
                          <td className="p-3">{round3(r.f)}</td>
                          <td className="p-3">{round3(r.i)}</td>
                          <td className="p-3">{round3(r.o)}</td>
                          <td className="p-3">{round3(r.g)}</td>
                          <td className="p-3">{round3(r.c)}</td>
                          <td className="p-3">{round3(r.h)}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <Sigma className="h-4 w-4" />
              <span>External interactive</span>
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              If you want a richer visual sim, this page also links an external interactive embedded below.
            </p>

            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              Demo:{" "}
              <a className="underline underline-offset-4" href="/mind-morph-sim/" target="_blank" rel="noreferrer">
                Mind Morph Sim
              </a>
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]">
              <div className="aspect-video w-full">
                <iframe title="Mind Morph Sim" className="h-full w-full" src="/mind-morph-sim/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
