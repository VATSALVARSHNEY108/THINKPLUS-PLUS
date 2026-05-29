"use client";

import React from "react";
import { TheorySection } from "../../../components/TheorySection";

export default function RoleOfLexicalAnalyzer() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <TheorySection 
        title="Role Of Lexical Analyzer"
        definition="This section covers Role Of Lexical Analyzer."
        timeComplexity="O(1)"
        spaceComplexity="O(1)"
        keyPoints={["Key Point 1", "Key Point 2"]}
      />
    </div>
  );
}
