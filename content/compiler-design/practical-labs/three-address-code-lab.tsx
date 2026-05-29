"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function ThreeAddressCodeLab() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Three Address Code Lab"
        definition="This section covers Three Address Code Lab."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
