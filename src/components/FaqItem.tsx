"use client";

import { useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-ink/15 bg-white px-5 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-6 text-left text-[1.0625rem] text-ink"
        aria-expanded={isOpen}
      >
        {question}
        <span aria-hidden className="relative block size-3.5 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
          <span
            className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink transition-transform duration-300 ${
              isOpen ? "scale-y-0" : ""
            }`}
          />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
