const methods = [
  {
    name: "Word Tokenization",
    detail: "Splits text by words/spaces. Simple and readable, but weak for unknown words and morphology-rich languages.",
  },
  {
    name: "Character Tokenization",
    detail: "Uses single characters as tokens. Handles any text, but sequences become long and training becomes slower.",
  },
  {
    name: "Subword Tokenization (BPE / WordPiece / Unigram)",
    detail: "Breaks words into frequent pieces. Best balance between vocabulary size, robustness, and model efficiency.",
  },
  {
    name: "Byte-level Tokenization",
    detail: "Operates over bytes so every input is representable. Great coverage across scripts and symbols.",
  },
];

const pipeline = [
  "Normalize text (case, unicode form, spacing).",
  "Pre-tokenize (basic splitting around punctuation/whitespace).",
  "Apply tokenizer model (BPE/WordPiece/Unigram).",
  "Map tokens to ids using a fixed vocabulary.",
  "Add special tokens like [CLS], [SEP], [PAD], [UNK].",
  "Create attention mask and truncate/pad to max length.",
];

export default function Tokenization() {
  return (
    <section className="px-12 py-24">
      <header className="max-w-4xl">
        <h1 className="text-3xl font-semibold">Tokenization</h1>
        <p className="mt-4 text-base">
          Tokenization is the process of converting raw text into units a model can understand. Good tokenization improves quality, speed, multilingual
          support, and cost efficiency.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border p-6" style={{ borderColor: "var(--border-primary)" }}>
          <h2 className="text-xl font-semibold">Why It Matters</h2>
          <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>Controls context usage: fewer tokens means more room for meaning.</li>
            <li>Impacts inference cost and latency directly.</li>
            <li>Changes how well rare words, names, and code are represented.</li>
            <li>Influences multilingual and domain-specific performance.</li>
          </ul>
        </article>

        <article className="rounded-lg border p-6" style={{ borderColor: "var(--border-primary)" }}>
          <h2 className="text-xl font-semibold">Core Terms</h2>
          <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>Token: smallest unit consumed by the model.</li>
            <li>Vocabulary: list of known token pieces.</li>
            <li>Token ID: numeric index for a token.</li>
            <li>Special Tokens: control tokens like start/end/padding/unknown.</li>
          </ul>
        </article>
      </div>

      <article className="mt-6 rounded-lg border p-6" style={{ borderColor: "var(--border-primary)" }}>
        <h2 className="text-xl font-semibold">Main Tokenization Methods</h2>
        <div className="mt-4 space-y-3">
          {methods.map((method) => (
            <div key={method.name} className="rounded-md border p-4" style={{ borderColor: "var(--border-primary)" }}>
              <h3 className="text-base font-semibold">{method.name}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {method.detail}
              </p>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border p-6" style={{ borderColor: "var(--border-primary)" }}>
          <h2 className="text-xl font-semibold">Typical NLP Pipeline</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm" style={{ color: "var(--text-secondary)" }}>
            {pipeline.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article className="rounded-lg border p-6" style={{ borderColor: "var(--border-primary)" }}>
          <h2 className="text-xl font-semibold">Practical Tradeoffs</h2>
          <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>Larger vocabulary: shorter sequences, more memory.</li>
            <li>Smaller vocabulary: longer sequences, better generalization.</li>
            <li>Domain mismatch (medical/legal/code) can fragment important terms.</li>
            <li>Token count estimation is essential for prompt budgeting.</li>
          </ul>
        </article>
      </div>

      <article className="mt-6 rounded-lg border p-6" style={{ borderColor: "var(--border-primary)" }}>
        <h2 className="text-xl font-semibold">Examples</h2>
        <div className="mt-4 space-y-4 text-sm" style={{ color: "var(--text-secondary)" }}>
          <p>
            <strong>Input:</strong> <code>Tokenization improves NLP systems.</code>
          </p>
          <p>
            <strong>Possible subword tokens:</strong> <code>["Token", "ization", "improve", "s", "NLP", "system", "s", "."]</code>
          </p>
          <p>
            <strong>ID mapping:</strong> each token is converted to an integer before entering embeddings.
          </p>
        </div>
      </article>
    </section>
  );
}
