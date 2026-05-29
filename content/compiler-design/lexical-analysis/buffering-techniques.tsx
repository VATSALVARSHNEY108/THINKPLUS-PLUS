"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function BufferingTechniques() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Buffering Techniques"
        definition="This section covers Buffering Techniques."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
