import FrameworkLessonLayout, {
  type FrameworkLessonMeta,
} from "@/components/frameworks/FrameworkLessonLayout";

const meta: FrameworkLessonMeta = {
  subjectId: "artificial-intelligence",
  topicId: "frameworks",
  lessonId: "ScikitLearn",
  title: "scikit-learn",
  tagline:
    "scikit-learn is the go-to library for classical machine learning: preprocessing, feature engineering, models, evaluation, and pipelines.",
  install: {
    steps: [
      "Create a virtual environment (recommended) and activate it.",
      "Install: `pip install scikit-learn`.",
      "Verify: `python -c \"import sklearn; print(sklearn.__version__)\"`.",
    ],
    notes: ["For tabular ML, pair this with Pandas for ETL and NumPy for array math."],
  },
  helloWorld: {
    code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)
clf = LogisticRegression(max_iter=1000).fit(Xtr, ytr)
print(clf.score(Xte, yte))`,
    notes: ["This gives a strong baseline quickly—then improve features, CV, and metrics."],
  },
  bestFor: [
    "Classical ML baselines (linear models, trees, ensembles, SVMs).",
    "Evaluation + cross-validation + model selection.",
    "Packaging preprocessing and models with `Pipeline`.",
  ],
  notFor: [
    "Large neural nets and GPU-heavy training (use PyTorch/TF).",
    "End-to-end deep learning fine-tuning of LLMs (use HF + PyTorch/TF).",
  ],
  pitfalls: [
    "Data leakage: preprocessing on the full dataset before splitting (use `Pipeline`).",
    "Wrong metric for the business goal (accuracy can be misleading).",
    "Not using cross-validation when data is limited.",
    "Ignoring class imbalance; consider stratified splits and proper metrics.",
  ],
  related: [
    {
      title: "Pandas",
      href: "/curriculum/artificial-intelligence/frameworks/Pandas",
      desc: "ETL and feature engineering for tabular ML.",
    },
    {
      title: "NumPy",
      href: "/curriculum/artificial-intelligence/frameworks/NumPy",
      desc: "Array math under the hood of many sklearn workflows.",
    },
    {
      title: "PyTorch",
      href: "/curriculum/artificial-intelligence/frameworks/PyTorch",
      desc: "For neural nets when classical ML is not enough.",
    },
  ],
  prev: { title: "Pandas", lessonId: "Pandas" },
  next: { title: "PyTorch", lessonId: "PyTorch" },
};

export default function ScikitLearn() {
  return (
    <FrameworkLessonLayout meta={meta}>
      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Strengths</h2>
        <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
          <li>Solid baselines: linear models, trees, ensembles, SVMs.</li>
          <li>Clean, consistent APIs: fit / predict / transform.</li>
          <li>Great evaluation tooling: metrics, CV, model selection.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          The pipeline pattern
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          A pipeline chains preprocessing and a model into a single object, which helps avoid data
          leakage and keeps training/inference consistent.
        </p>
        <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 p-5 font-mono text-xs leading-relaxed text-[var(--text-secondary)] overflow-auto">
          {`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
  ("scale", StandardScaler()),
  ("clf", LogisticRegression())
])
pipe.fit(X_train, y_train)
pred = pipe.predict(X_test)`}
        </div>
      </section>
    </FrameworkLessonLayout>
  );
}
