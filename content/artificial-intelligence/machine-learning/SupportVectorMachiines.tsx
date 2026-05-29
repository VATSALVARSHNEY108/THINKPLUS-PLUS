"use client";

import { useMemo, useState } from "react";

export default function SupportVectorMachines() {
  const [cPenalty, setCPenalty] = useState(50);
  const [gamma, setGamma] = useState(40);
  const [kernelFlex, setKernelFlex] = useState(55);

  const metrics = useMemo(() => {
    const marginQuality = Math.min(99, Math.max(15, Math.round(80 - cPenalty * 0.45 + kernelFlex * 0.15)));
    const boundaryComplexity = Math.min(100, Math.max(5, Math.round(gamma * 0.7 + kernelFlex * 0.35)));
    const generalization = Math.min(98, Math.max(20, Math.round(55 + marginQuality * 0.35 - boundaryComplexity * 0.25)));
    const trainingCost = Math.min(100, Math.round(cPenalty * 0.5 + gamma * 0.6 + kernelFlex * 0.2));
    return { marginQuality, boundaryComplexity, generalization, trainingCost };
  }, [cPenalty, gamma, kernelFlex]);

  return (
    <section className="w-full px-6 md:px-10 py-10 md:py-14">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-7 md:p-9">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500 mb-3">Lesson 12</p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">Support Vector Machines (SVM)</h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            SVM finds a maximum-margin separator. With kernels, it models nonlinear class boundaries in transformed feature space.
            Hyperparameters `C` and `gamma` control margin strictness and boundary flexibility.
          </p>
        </header>

        <article className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 md:p-7">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Simulation: Margin vs Boundary Complexity</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Slider label="C (Penalty)" value={cPenalty} onChange={setCPenalty} />
              <Slider label="Gamma Sensitivity" value={gamma} onChange={setGamma} />
              <Slider label="Kernel Flexibility" value={kernelFlex} onChange={setKernelFlex} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric title="Margin Quality" value={`${metrics.marginQuality}%`} />
              <Metric title="Boundary Complexity" value={`${metrics.boundaryComplexity}%`} />
              <Metric title="Generalization" value={`${metrics.generalization}%`} />
              <Metric title="Training Cost" value={`${metrics.trainingCost}%`} />
            </div>
          </div>
          <p className="mt-5 text-sm text-[var(--text-secondary)]">Professional tip: very high `gamma` creates wiggly boundaries and overfitting; tune `C` and `gamma` jointly with cross-validation.</p>
        </article>
      </div>
    </section>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm mb-2"><span className="text-[var(--text-secondary)]">{label}</span><span className="font-semibold text-[var(--text-primary)]">{value}%</span></div>
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-indigo-500" />
    </label>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-4">
      <p className="text-xs text-[var(--text-secondary)] mb-1">{title}</p>
      <p className="text-2xl font-black text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
