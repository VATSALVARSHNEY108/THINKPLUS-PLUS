"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function LinkingAndLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Linking And Loading"
        definition="This section covers Linking And Loading."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
