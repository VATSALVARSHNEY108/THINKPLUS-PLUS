import FrameworkLessonLayout, {
  type FrameworkLessonMeta,
} from "@/components/frameworks/FrameworkLessonLayout";

const meta: FrameworkLessonMeta = {
  subjectId: "artificial-intelligence",
  topicId: "frameworks",
  lessonId: "HuggingFace",
  title: "Hugging Face",
  tagline:
    "Hugging Face is an ecosystem for using, training, and sharing ML models—especially transformers—through a model hub plus libraries like Transformers, Datasets, and Tokenizers.",
  install: {
    steps: [
      "Create a virtual environment (recommended) and activate it.",
      "Install: `pip install transformers datasets tokenizers accelerate`.",
      "If you train, install a backend: PyTorch or TensorFlow.",
    ],
    notes: [
      "For GPU training, install a CUDA-enabled PyTorch build. CPU-only is fine for demos.",
      "Many workflows download model weights; expect a first-run network + disk hit.",
    ],
  },
  helloWorld: {
    code: `from transformers import pipeline

clf = pipeline("sentiment-analysis")
print(clf("I love clean interfaces and fast iterations."))`,
    notes: ["`pipeline(...)` is the fastest on-ramp; later you’ll control tokenizers/models directly."],
  },
  bestFor: [
    "Running strong pretrained transformer baselines quickly.",
    "Fine-tuning and evaluating NLP/multimodal models.",
    "Sharing models and datasets reproducibly (Hub + cards).",
  ],
  notFor: [
    "Pure classical ML without transformers (use scikit-learn).",
    "Low-level tensor math (use NumPy), or ETL (use Pandas).",
  ],
  pitfalls: [
    "Version mismatches between Transformers, PyTorch/TF, and CUDA builds.",
    "Out-of-memory errors on GPUs; start with smaller models or smaller batch sizes.",
    "Tokenizer/model mismatch (wrong checkpoint family). Always load both from the same model id.",
    "Assuming `pipeline` defaults match your task (labels, truncation, max_length).",
  ],
  related: [
    {
      title: "PyTorch",
      href: "/curriculum/artificial-intelligence/frameworks/PyTorch",
      desc: "Common backend for training and fine-tuning.",
    },
    {
      title: "TensorFlow",
      href: "/curriculum/artificial-intelligence/frameworks/TensorFlow",
      desc: "Alternative backend; some HF workflows support TF.",
    },
    {
      title: "Pandas",
      href: "/curriculum/artificial-intelligence/frameworks/Pandas",
      desc: "For cleaning datasets before tokenization and training.",
    },
  ],
  prev: { title: "TensorFlow", lessonId: "TensorFlow" },
  next: { title: "NumPy", lessonId: "NumPy" },
};

export default function HuggingFace() {
  return (
    <FrameworkLessonLayout meta={meta}>
      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          When to use it
        </h2>
        <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
          <li>Quickly download and run a strong baseline model.</li>
          <li>Fine-tune a pretrained model on your dataset.</li>
          <li>Share models, datasets, and demos reproducibly.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          Core building blocks
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Model Hub",
              desc: "Hosted models with versioned weights, configs, and cards.",
            },
            {
              title: "Transformers",
              desc: "High-level APIs for inference and training across tasks.",
            },
            {
              title: "Datasets",
              desc: "Dataset loading, preprocessing, caching, and streaming.",
            },
            {
              title: "Tokenizers",
              desc: "Fast tokenization aligned with pretrained model vocabularies.",
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

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Mental model</h2>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          Treat Hugging Face as a “package manager” for models + the runtime tooling to use them.
          You pick a checkpoint, load it with the right tokenizer, and run inference or fine-tuning
          with a trainer.
        </p>
      </section>
    </FrameworkLessonLayout>
  );
}
