"use client";

export default function NeuralNetworks() {
  return (
    <section className="w-full px-4 py-8 md:px-8">
      <div className="w-full border border-[var(--border-primary)] bg-[var(--bg-primary)]">
        <iframe
          src="/tensorflow-playground-site/index.html"
          title="TensorFlow Playground"
          className="w-full"
          style={{ border: 0, height: "85vh" }}
        />
      </div>
    </section>
  );
}
