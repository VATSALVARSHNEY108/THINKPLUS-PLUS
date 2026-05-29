import FrameworkLessonLayout, {
  type FrameworkLessonMeta,
} from "@/components/frameworks/FrameworkLessonLayout";

const meta: FrameworkLessonMeta = {
  subjectId: "artificial-intelligence",
  topicId: "frameworks",
  lessonId: "PyTorch",
  title: "PyTorch",
  tagline:
    "PyTorch is a deep learning framework built around tensors, GPU acceleration, and automatic differentiation—great for research and production training.",
  install: {
    steps: [
      "Create a virtual environment (recommended) and activate it.",
      "Install PyTorch from the official selector (CPU vs CUDA matters).",
      "Verify: `python -c \"import torch; print(torch.__version__, torch.cuda.is_available())\"`.",
    ],
    notes: [
      "CUDA builds are tied to your GPU driver + CUDA runtime; mismatches are a common install issue.",
    ],
  },
  helloWorld: {
    code: `import torch

x = torch.tensor([1.0, 2.0, 3.0])
w = torch.tensor([0.1, 0.2, 0.3], requires_grad=True)
y = (x * w).sum()
y.backward()
print(w.grad)  # gradients via autograd`,
    notes: ["Autograd tracks ops on tensors to compute gradients automatically."],
  },
  bestFor: [
    "Training neural networks with custom control (research-friendly).",
    "Fine-tuning transformer models (often via Hugging Face).",
    "GPU acceleration with explicit, debuggable Python code.",
  ],
  notFor: [
    "Simple tabular baselines where scikit-learn is faster to iterate.",
    "Pure ETL and joins (Pandas/DuckDB is better).",
  ],
  pitfalls: [
    "Silent device bugs: mixing CPU and GPU tensors (`.to(device)` consistently).",
    "Forgetting `model.train()` / `model.eval()` around training/inference.",
    "Not using `torch.no_grad()` during inference (extra memory/compute).",
    "DataLoader bottlenecks: slow preprocessing can starve the GPU.",
  ],
  related: [
    {
      title: "Hugging Face",
      href: "/curriculum/artificial-intelligence/frameworks/HuggingFace",
      desc: "Transformers + datasets + training utilities on top of PyTorch.",
    },
    {
      title: "TensorFlow",
      href: "/curriculum/artificial-intelligence/frameworks/TensorFlow",
      desc: "Alternative deep learning framework with strong production tooling.",
    },
    {
      title: "NumPy",
      href: "/curriculum/artificial-intelligence/frameworks/NumPy",
      desc: "Array math foundation; PyTorch tensors feel similar.",
    },
  ],
  prev: { title: "scikit-learn", lessonId: "ScikitLearn" },
  next: { title: "TensorFlow", lessonId: "TensorFlow" },
};

export default function PyTorch() {
  return (
    <FrameworkLessonLayout meta={meta}>
      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          The PyTorch loop
        </h2>
        <ol className="mt-5 space-y-3 text-[var(--text-secondary)] list-decimal pl-5">
          <li>Forward pass: compute predictions.</li>
          <li>Loss: compare predictions vs targets.</li>
          <li>Backward pass: compute gradients via autodiff.</li>
          <li>Optimizer step: update parameters.</li>
        </ol>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          Key abstractions
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { title: "Tensor", desc: "N-D array with CPU/GPU storage and ops." },
            { title: "autograd", desc: "Tracks ops to compute gradients automatically." },
            { title: "nn.Module", desc: "Composable model building blocks." },
            { title: "DataLoader", desc: "Batching + shuffling + parallel loading." },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-[1.5rem] bg-[var(--bg-secondary)]/40 border border-[var(--border-subtle)] p-6"
            >
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </FrameworkLessonLayout>
  );
}
