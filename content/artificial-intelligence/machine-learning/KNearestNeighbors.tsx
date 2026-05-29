"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Sparkles, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MLGlassCard, MLSectionTitle } from "@/components/ml/MLGlassCard";
import { MLHeroBackdrop } from "@/components/ml/MLHeroBackdrop";
import { MLWorkflowPipeline } from "@/components/ml/MLWorkflowPipeline";
import { MLCodeBlock } from "@/components/ml/MLCodeBlock";
import { MLLineChart } from "@/components/ml/MLLineChart";

type P = { x: number; y: number; c: 0 | 1; id: string };

const BASE: P[] = [
  { id: "A", x: 0.12, y: 0.22, c: 0 },
  { id: "B", x: 0.2, y: 0.18, c: 0 },
  { id: "C", x: 0.28, y: 0.25, c: 0 },
  { id: "D", x: 0.75, y: 0.72, c: 1 },
  { id: "E", x: 0.7, y: 0.62, c: 1 },
  { id: "F", x: 0.82, y: 0.78, c: 1 },
  { id: "G", x: 0.42, y: 0.45, c: 0 },
  { id: "H", x: 0.58, y: 0.55, c: 1 },
  { id: "I", x: 0.35, y: 0.65, c: 0 },
  { id: "J", x: 0.66, y: 0.35, c: 1 },
  { id: "K", x: 0.5, y: 0.21, c: 0 },
  { id: "L", x: 0.47, y: 0.74, c: 1 },
];

export default function KNearestNeighbors() {
  const simRef = useRef<HTMLDivElement>(null);

  const [k, setK] = useState(3);
  const [qx, setQx] = useState(0.52);
  const [qy, setQy] = useState(0.48);
  const [distance, setDistance] = useState<"euclidean" | "manhattan">("euclidean");
  const [weighted, setWeighted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [speedMs, setSpeedMs] = useState(550);

  const result = useMemo(() => {
    const d = (a: P, x: number, y: number) => {
      if (distance === "manhattan") return Math.abs(a.x - x) + Math.abs(a.y - y);
      return Math.hypot(a.x - x, a.y - y);
    };
    const sortedAll = BASE.map((p, i) => ({ i, p, dist: d(p, qx, qy) })).sort((a, b) => a.dist - b.dist);
    const sorted = sortedAll.slice(0, k);
    let score0 = 0;
    let score1 = 0;
    for (const n of sorted) {
      const w = weighted ? 1 / Math.max(0.001, n.dist) : 1;
      if (n.p.c === 0) score0 += w;
      else score1 += w;
    }
    return { neighbors: sorted, sortedAll, pred: score1 >= score0 ? 1 : 0, score0, score1 };
  }, [k, qx, qy, distance, weighted]);

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [k, qx, qy, distance, weighted]);

  useEffect(() => {
    if (!isPlaying) return;
    const limit = Math.min(k, result.sortedAll.length);
    const t = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= limit) {
          window.clearInterval(t);
          return limit;
        }
        return prev + 1;
      });
    }, Math.max(120, speedMs));
    return () => window.clearInterval(t);
  }, [isPlaying, speedMs, k, result.sortedAll.length]);

  const visibleNeighborCount = Math.min(stepIndex, result.neighbors.length);
  const visibleNeighbors = result.neighbors.slice(0, visibleNeighborCount);

  const effectiveVotes = useMemo(() => {
    let score0 = 0;
    let score1 = 0;
    for (const n of visibleNeighbors) {
      const w = weighted ? 1 / Math.max(0.001, n.dist) : 1;
      if (n.p.c === 0) score0 += w;
      else score1 += w;
    }
    const pred = score1 >= score0 ? 1 : 0;
    return { score0, score1, pred };
  }, [visibleNeighbors, weighted]);

  const distSeries = result.sortedAll.map((n) => n.dist);

  const resetSteps = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  return (
    <section className="w-full px-6 md:px-10 py-10 md:py-14">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 p-8">
          <MLHeroBackdrop accent="cyan" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">K-Nearest Neighbors</h1>
            <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">
              A lazy learner: no heavy training loop, just distance-based reasoning at inference time. Great for intuition, local patterns, and explainable predictions.
            </p>
            <Button
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl"
              onClick={() => simRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              <Sparkles size={16} className="mr-2" /> Start KNN Lab
            </Button>
          </div>
        </section>

        <div ref={simRef}>
          <MLGlassCard className="p-8">
            <MLSectionTitle eyebrow="Interactive simulation" title="Vote by nearest neighbors" />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Slider label="k neighbors" value={k} min={1} max={9} step={1} onChange={(v) => setK(Math.round(v))} />
              <Slider label="Query x" value={qx} min={0.05} max={0.95} step={0.01} onChange={setQx} />
              <Slider label="Query y" value={qy} min={0.05} max={0.95} step={0.01} onChange={setQy} />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setDistance("euclidean")} className={`rounded-2xl ${distance === "euclidean" ? "bg-indigo-600/20 border border-indigo-500/40" : "bg-[var(--bg-primary)]/20 border border-[var(--border-subtle)]"}`}>Euclidean</Button>
                <Button variant="secondary" onClick={() => setDistance("manhattan")} className={`rounded-2xl ${distance === "manhattan" ? "bg-indigo-600/20 border border-indigo-500/40" : "bg-[var(--bg-primary)]/20 border border-[var(--border-subtle)]"}`}>Manhattan</Button>
                <Button variant="secondary" onClick={() => setWeighted((w) => !w)} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/20">
                  {weighted ? "Weighted" : "Uniform"}
                </Button>
              </div>

              <div>
                <Slider label="Step animation speed (ms)" value={speedMs} min={120} max={1200} step={10} onChange={setSpeedMs} />
              </div>

              <div className="flex gap-2">
                <Button className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setIsPlaying((v) => !v)}>
                  {isPlaying ? <Pause size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="secondary" className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/20" onClick={resetSteps}>
                  <RotateCcw size={16} className="mr-2" /> Reset
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/15 p-3">
              <svg viewBox="0 0 520 320" className="w-full h-auto">
                <rect x={22} y={14} width={470} height={280} rx={14} fill="transparent" stroke="rgba(255,255,255,0.08)" />
                {BASE.map((p, idx) => {
                  const x = 22 + p.x * 470;
                  const y = 14 + (1 - p.y) * 280;
                  const isN = visibleNeighbors.some((n) => n.i === idx);
                  return <circle key={idx} cx={x} cy={y} r={isN ? 7 : 5} fill={p.c ? "rgba(168,85,247,0.95)" : "rgba(34,211,238,0.95)"} opacity={isN ? 1 : 0.7} />;
                })}
                <circle cx={22 + qx * 470} cy={14 + (1 - qy) * 280} r={8} fill="white" />
              </svg>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <MiniMetric title="Active neighbors" value={`${visibleNeighborCount}/${k}`} />
                <MiniMetric title="Predicted class" value={`${effectiveVotes.pred}`} />
                <MiniMetric title="Score class 0" value={effectiveVotes.score0.toFixed(3)} />
                <MiniMetric title="Score class 1" value={effectiveVotes.score1.toFixed(3)} />
              </div>
            </div>
          </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MLLineChart values={distSeries} currentIndex={Math.max(0, visibleNeighborCount - 1)} stroke="rgb(34,211,238)" />
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/15 p-4">
                <div className="text-sm font-black text-[var(--text-primary)]">Step-by-step neighbor table</div>
                <div className="mt-3 space-y-2">
                  {result.neighbors.map((n, i) => (
                    <div key={n.p.id} className={`rounded-xl border px-3 py-2 text-sm flex justify-between ${i < visibleNeighborCount ? "border-indigo-500/40 bg-indigo-500/10" : "border-[var(--border-subtle)] bg-[var(--bg-primary)]/20"}`}>
                      <span className="text-[var(--text-secondary)]">#{i + 1} • Point {n.p.id} • class {n.p.c}</span>
                      <span className="font-mono text-[var(--text-primary)]">d={n.dist.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MLGlassCard>
        </div>

        <MLGlassCard className="p-8">
          <MLSectionTitle eyebrow="Mathematical intuition" title="Distance + local voting" />
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/15 p-4">
              <BlockMath math={"d_{euclid}(x, x_i)=\\sqrt{\\sum_j (x_j-x_{ij})^2}"} />
              <BlockMath math={"d_{manhattan}(x, x_i)=\\sum_j |x_j-x_{ij}|"} />
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/15 p-4">
              <BlockMath math={"\\hat{y}=\\arg\\max_c\\sum_{i\\in N_k(x)} w_i\\,\\mathbf{1}[y_i=c]"} />
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                with optional weighted votes <InlineMath math={"w_i=1/(d_i+\\epsilon)"} />.
              </p>
            </div>
          </div>
        </MLGlassCard>

        <MLWorkflowPipeline
          steps={[
            { id: "1", label: "Input", hint: "Feature vector x" },
            { id: "2", label: "Processing", hint: "Compute distance to all points" },
            { id: "3", label: "Learning", hint: "Store training set (lazy)" },
            { id: "4", label: "Prediction", hint: "k-neighbor vote" },
            { id: "5", label: "Output", hint: "Class / regression value" },
          ]}
        />

        <MLGlassCard className="p-8">
          <MLSectionTitle eyebrow="Real-world applications" title="Where KNN is used" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <UseCaseCard title="Recommender warm-start" desc="Find users/items with similar behavior vectors." />
            <UseCaseCard title="Anomaly triage" desc="Points far from neighbors are likely suspicious." />
            <UseCaseCard title="Medical support tools" desc="Nearest historical cases help form baseline decisions." />
          </div>
        </MLGlassCard>

        <MLGlassCard className="p-8">
          <MLSectionTitle eyebrow="Common mistakes & limitations" title="When KNN fails" />
          <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
            <li>• No feature scaling: large-unit features dominate distances.</li>
            <li>• Wrong k: too small overfits noise, too large underfits local structure.</li>
            <li>• High dimensions: distances become less informative (curse of dimensionality).</li>
            <li>• Slow inference on large datasets without indexing (KD-tree/ANN needed).</li>
          </ul>
        </MLGlassCard>

        <MLGlassCard className="p-8">
          <MLSectionTitle eyebrow="Code implementation" title="Simple Python KNN" />
          <MLCodeBlock
            language="python"
            code={`from math import hypot\n\ndef knn_predict(train, qx, qy, k=3):\n    dists = []\n    for x, y, c in train:\n        d = hypot(x-qx, y-qy)\n        dists.append((d, c))\n    dists.sort(key=lambda t: t[0])\n    top = dists[:k]\n    score1 = sum(1/(d+1e-6) for d,c in top if c==1)\n    score0 = sum(1/(d+1e-6) for d,c in top if c==0)\n    return 1 if score1 >= score0 else 0`}
          />
        </MLGlassCard>

        <MLGlassCard className="p-8">
          <MLSectionTitle eyebrow="Final summary" title="Quick cheat sheet" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <UseCaseCard title="Core idea" desc="Predict by local neighbors in feature space." />
            <UseCaseCard title="Tune first" desc="k, distance metric, weighting, scaling." />
            <UseCaseCard title="Interview prompt" desc="Why does KNN struggle in high dimensions?" />
          </div>
        </MLGlassCard>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className="font-semibold text-[var(--text-primary)]">{value.toFixed(2)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-indigo-500" />
    </label>
  );
}

function MiniMetric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/20 p-3">
      <div className="text-[10px] text-[var(--text-secondary)]">{title}</div>
      <div className="text-lg font-black text-[var(--text-primary)]">{value}</div>
    </div>
  );
}

function UseCaseCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/20 p-4">
      <div className="font-black text-[var(--text-primary)]">{title}</div>
      <div className="mt-1 text-sm text-[var(--text-secondary)]">{desc}</div>
    </div>
  );
}

