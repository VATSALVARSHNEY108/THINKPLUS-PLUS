"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function FrontEndVsBackEnd() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Front End Vs Back End"
        definition="This section covers Front End Vs Back End."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
