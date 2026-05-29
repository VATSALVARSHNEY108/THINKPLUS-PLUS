import FrameworkLessonLayout, {
  type FrameworkLessonMeta,
} from "@/components/frameworks/FrameworkLessonLayout";

const meta: FrameworkLessonMeta = {
  subjectId: "artificial-intelligence",
  topicId: "frameworks",
  lessonId: "TensorFlow",
  title: "TensorFlow",
  tagline:
    "TensorFlow is a deep learning framework with strong production tooling. Keras provides a high-level API for building and training models on CPU/GPU/TPU.",
  install: {
    steps: [
      "Create a virtual environment (recommended) and activate it.",
      "Install: `pip install tensorflow` (or `tensorflow-cpu` depending on platform).",
      "Verify: `python -c \"import tensorflow as tf; print(tf.__version__)\"`.",
    ],
    notes: ["GPU support depends on OS + drivers; follow the official install matrix for your setup."],
  },
  helloWorld: {
    code: `import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Dense(8, activation="relu"),
  tf.keras.layers.Dense(1),
])
model.compile(optimizer="adam", loss="mse")
print(model(tf.ones((2, 4))))`,
    notes: ["Keras handles the training loop; you can also write custom loops with GradientTape."],
  },
  bestFor: [
    "Quick model building and training with Keras.",
    "Production export/serving workflows (SavedModel, TF Serving, TFLite).",
    "Teams that value a batteries-included ecosystem.",
  ],
  notFor: [
    "Highly custom research training loops where you want maximum Python-level control (PyTorch often feels nicer).",
    "Tabular baselines and CV (scikit-learn is quicker).",
  ],
  pitfalls: [
    "GPU install confusion: driver/CUDA/cuDNN mismatches (follow the official matrix).",
    "Mixing eager mode expectations with graph/export constraints; test export early.",
    "Inconsistent preprocessing between train and serve; package preprocessing with the model.",
    "Silent shape issues—log tensor shapes through the network.",
  ],
  related: [
    {
      title: "PyTorch",
      href: "/curriculum/artificial-intelligence/frameworks/PyTorch",
      desc: "Alternative deep learning framework with very explicit training loops.",
    },
    {
      title: "Hugging Face",
      href: "/curriculum/artificial-intelligence/frameworks/HuggingFace",
      desc: "Transformer tooling that supports TensorFlow for some workflows.",
    },
    {
      title: "NumPy",
      href: "/curriculum/artificial-intelligence/frameworks/NumPy",
      desc: "Foundational array math; TF tensors feel similar but add autodiff.",
    },
  ],
  prev: { title: "PyTorch", lessonId: "PyTorch" },
  next: { title: "Hugging Face", lessonId: "HuggingFace" },
};

export default function TensorFlow() {
  return (
    <FrameworkLessonLayout meta={meta}>
      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          What TensorFlow gives you
        </h2>
        <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
          <li>Tensors + acceleration on CPU/GPU/TPU.</li>
          <li>Autodiff for gradients.</li>
          <li>Keras for ergonomic model building.</li>
          <li>Export + serving tools for production.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          Minimal Keras training (pseudocode)
        </h2>
        <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 p-5 font-mono text-xs leading-relaxed text-[var(--text-secondary)] overflow-auto">
          {`import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, activation="relu"),
  tf.keras.layers.Dense(1),
])
model.compile(optimizer="adam", loss="mse")
model.fit(X_train, y_train, epochs=10, batch_size=32)`}
        </div>
      </section>

      <section className="rounded-[2rem] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-premium">
        <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
          Keras vs low-level
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          Keras handles most training loops for you. For custom research loops, you can drop lower
          and use gradient tapes, custom steps, and custom layers. If you need to export and serve,
          validate that path early.
        </p>
      </section>
    </FrameworkLessonLayout>
  );
}
