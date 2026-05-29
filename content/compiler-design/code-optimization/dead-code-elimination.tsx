"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function DeadCodeElimination() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Dead Code Elimination"
        definition="This section covers Dead Code Elimination."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
