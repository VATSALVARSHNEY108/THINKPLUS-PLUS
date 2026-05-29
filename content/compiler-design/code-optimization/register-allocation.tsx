"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function RegisterAllocation() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Register Allocation"
        definition="This section covers Register Allocation."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
