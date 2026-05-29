// app/curriculum/CurriculumCards.tsx
"use client";

import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import { Subject } from "@/lib/content-types";
import { SUBJECT_META } from "@/lib/content-registry";

const FALLBACK_COLORS = {
  accent: "var(--text-primary)",
  bg: "rgba(255, 255, 255, 0.05)",
  border: "rgba(255, 255, 255, 0.1)"
};

const SUBJECT_COLORS: Record<string, { accent: string; bg: string; border: string }> = {
  "artificial-intelligence": {
    accent: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
    border: "rgba(139, 92, 246, 0.2)"
  }
};

const SUBJECT_ICON_MAP: Record<string, any> = {};

export default function CurriculumCards({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {subjects.map((subject, i) => {
        const colors = SUBJECT_COLORS[subject.id] ?? FALLBACK_COLORS;
        const Icon = SUBJECT_ICON_MAP[subject.id] ?? Layers;
        const topicCount = subject.topics?.length ?? 0;
        return (
          <Link
            key={subject.id}
            href={`/curriculum/${subject.id}`}
            className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--text-primary)]"
            style={{
              background: "rgba(26, 26, 30, 0.05)"
            }}
            id={`subject-${subject.id}`}
          >
            {/* Accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
              style={{ backgroundColor: colors.accent }}
            />
            {/* Icon */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
            >
              <Icon size={20} style={{ color: colors.accent }} />
            </div>
            {/* Title & Description */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
                {subject.name}
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] opacity-70 line-clamp-2">
                {subject.description || `Explore ${subject.name} curriculum.`}
              </p>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between text-[10px] font-bold uppercase opacity-60">
              <span>{topicCount} {topicCount === 1 ? "topic" : "topics"}</span>
              <BookOpen size={12} className="opacity-70" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
