export default function Embeddings() {
  return (
    <section className="px-12 py-24">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Embeddings</h1>
        <p className="mt-4 text-base">
          Embeddings map words, tokens, and concepts into dense vector spaces where semantic similarity becomes geometric distance. Use the interactive
          projector below to explore neighborhoods, clusters, and analogy-like relationships.
        </p>
      </header>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Interactive: TensorFlow Embedding Projector</h2>
          <a
            className="text-sm underline underline-offset-4"
            href="/embedding-projector-standalone/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border" style={{ borderColor: "var(--border-primary)" }}>
          <iframe
            title="TensorFlow Embedding Projector"
            src="/embedding-projector-standalone/index.html"
            className="h-[75vh] w-full bg-transparent"
          />
        </div>
      </div>
    </section>
  );
}
