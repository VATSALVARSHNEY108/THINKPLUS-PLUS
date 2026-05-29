import FrameworkLessonLayout, {
  type FrameworkLessonMeta,
} from "@/components/frameworks/FrameworkLessonLayout";

const meta: FrameworkLessonMeta = {
  subjectId: "artificial-intelligence",
  topicId: "frameworks",
  lessonId: "Pandas",
  title: "Pandas",
  tagline:
    "Pandas is the tabular data workhorse: load, clean, join, reshape, and summarize datasets before modeling.",
  install: {
    steps: [
      "Create a virtual environment (recommended) and activate it.",
      "Install: `pip install pandas`.",
      "Verify: `python -c \"import pandas as pd; print(pd.__version__)\"`.",
    ],
    notes: ["For speed + smaller files, prefer Parquet over CSV when you can."],
  },
  helloWorld: {
    code: `import pandas as pd

df = pd.DataFrame({"age": [18, None, 34], "visits": [1, 0, 3]})
df["age"] = df["age"].fillna(df["age"].median())
df["visits"] = df["visits"].clip(lower=1)
print(df)`,
    notes: ["Pandas is usually the “prep” stage; models happen in sklearn/PyTorch/TF."],
  },
  bestFor: [
    "Cleaning messy CSV/JSON data into a modeling-ready table.",
    "Joins + aggregations (SQL-like tasks in Python).",
    "Feature engineering for classical ML.",
  ],
  notFor: [
    "GPU tensor training or autodiff (use PyTorch/TF).",
    "Huge datasets that don’t fit memory (consider DuckDB/Polars/Spark).",
  ],
  pitfalls: [
    "Chained indexing (can lead to silent copies). Prefer `.loc` for assignment.",
    "Mixed dtypes due to missing values; check `.dtypes` and cast intentionally.",
    "Row-wise `.apply(...)` loops are slow; prefer vectorized ops/groupby.",
    "Train/test leakage: fit preprocessing on train only (use sklearn pipelines).",
  ],
  related: [
    {
      title: "NumPy",
      href: "/curriculum/artificial-intelligence/frameworks/NumPy",
      desc: "Pandas columns are backed by NumPy arrays.",
    },
    {
      title: "scikit-learn",
      href: "/curriculum/artificial-intelligence/frameworks/ScikitLearn",
      desc: "Use pipelines to package preprocessing + a model safely.",
    },
    {
      title: "Hugging Face",
      href: "/curriculum/artificial-intelligence/frameworks/HuggingFace",
      desc: "For NLP datasets and transformer models.",
    },
  ],
  prev: { title: "NumPy", lessonId: "NumPy" },
  next: { title: "scikit-learn", lessonId: "ScikitLearn" },
};

export default function Pandas() {
  return (
    <FrameworkLessonLayout meta={meta}>
      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          What you do with Pandas
        </h2>
        <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
          <li>Read data from CSV/JSON/Parquet/SQL.</li>
          <li>Handle missing values, outliers, and type casting.</li>
          <li>Feature engineering: groupby, rolling windows, one-hot encoding.</li>
          <li>Merge multiple tables with joins.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Key concepts</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { title: "DataFrame", desc: "2D table with labeled columns and index." },
            { title: "Series", desc: "1D labeled array (a single column)." },
            { title: "Index", desc: "Row labels that enable alignment + fast lookup." },
            { title: "GroupBy", desc: "Split–apply–combine for aggregation and transforms." },
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
