import FrameworkLessonLayout, {
  type FrameworkLessonMeta,
} from "@/components/frameworks/FrameworkLessonLayout";

const meta: FrameworkLessonMeta = {
  subjectId: "artificial-intelligence",
  topicId: "frameworks",
  lessonId: "NumPy",
  title: "NumPy",
  tagline:
    "NumPy is the foundation of scientific Python: fast N-dimensional arrays, broadcasting, vectorized operations, and core linear algebra.",
  install: {
    steps: [
      "Create a virtual environment (recommended) and activate it.",
      "Install NumPy: `pip install numpy`.",
      "Verify: `python -c \"import numpy as np; print(np.__version__)\"`.",
    ],
    notes: ["If you also install pandas/scikit-learn, NumPy comes along automatically."],
  },
  helloWorld: {
    code: `import numpy as np

x = np.array([1, 2, 3])
y = x * 10
print(y)  # [10 20 30]`,
    notes: ["This “vectorized” style is why NumPy is fast: it pushes work into compiled code."],
  },
  bestFor: [
    "Fast numeric computation on CPU (arrays, matrix multiply, stats).",
    "Prototyping ML math (losses, gradients by hand, toy models).",
    "Preprocessing pipelines before training.",
  ],
  notFor: [
    "Automatic differentiation and deep learning training loops (use PyTorch/TF).",
    "Large-scale distributed training (use specialized frameworks).",
  ],
  pitfalls: [
    "Accidentally using Python loops instead of vectorized ops (slow).",
    "Shape bugs: mixing up `(n,)` vs `(n,1)` vs `(1,n)`; always print shapes.",
    "Broadcasting surprises: a computation “works” but produces the wrong shape.",
    "dtype mismatches (int vs float) causing truncation or overflow.",
  ],
  related: [
    {
      title: "Pandas",
      href: "/curriculum/artificial-intelligence/frameworks/Pandas",
      desc: "Tabular ETL built on NumPy arrays.",
    },
    {
      title: "scikit-learn",
      href: "/curriculum/artificial-intelligence/frameworks/ScikitLearn",
      desc: "Classical ML estimators that often accept NumPy arrays.",
    },
    {
      title: "PyTorch",
      href: "/curriculum/artificial-intelligence/frameworks/PyTorch",
      desc: "Tensors + autodiff + GPU training loops.",
    },
  ],
  prev: { title: "Hugging Face", lessonId: "HuggingFace" },
  next: { title: "Pandas", lessonId: "Pandas" },
};

export default function NumPy() {
  return (
    <FrameworkLessonLayout meta={meta}>
      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          Why ML uses NumPy
        </h2>
        <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
          <li>Represents data as arrays: vectors, matrices, tensors.</li>
          <li>Fast elementwise ops without Python loops (vectorization).</li>
          <li>Broadcasting makes shape math ergonomic.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Key ideas</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "ndarray",
              desc: "A strided view over memory with shape + dtype.",
            },
            {
              title: "Broadcasting",
              desc: "Rules for aligning shapes in elementwise operations.",
            },
            {
              title: "Vectorization",
              desc: "Use array ops; avoid explicit for-loops in Python.",
            },
            {
              title: "Linear algebra",
              desc: "Dot products, matrix multiply, decompositions, norms.",
            },
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
