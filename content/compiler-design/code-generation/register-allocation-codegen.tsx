"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function RegisterAllocationCodegen() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Register Allocation Codegen"
        definition="This section covers Register Allocation Codegen."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
