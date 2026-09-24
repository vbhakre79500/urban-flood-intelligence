"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ id, question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border border-(--border-subtle) rounded-lg overflow-hidden bg-(--surface) transition-colors">
      <button
        type="button"
        id={`faq-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-body-small text-(--text-primary) hover:bg-(--surface-subtle) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-(--text-muted) transition-transform duration-200 shrink-0 ml-2",
            isOpen && "rotate-180 text-(--brand-primary)"
          )}
        />
      </button>
      {isOpen && (
        <div
          id={`faq-panel-${id}`}
          role="region"
          aria-labelledby={`faq-btn-${id}`}
          className="p-4 pt-1 text-body-small text-(--text-muted) leading-relaxed border-t border-(--border-subtle) bg-(--surface-subtle)/30 animate-in fade-in duration-150"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}
