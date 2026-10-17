"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SEARCH_DEBOUNCE_MS = 300;

/** Non-interactive stand-in so the header never shifts while the field hydrates. */
export function SearchFieldShell({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Input
        disabled
        placeholder="Search"
        aria-hidden
        tabIndex={-1}
        className="h-11 rounded-xl border-border bg-card pr-10 pl-4 text-sm"
      />
      <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground/45" />
    </div>
  );
}

type SearchFieldProps = {
  value: string;
  onCommit: (value: string) => void;
  placeholder?: string;
  className?: string;
};

/**
 * Keeps typing local and instant, then pushes the keyword upstream after a short
 * pause. `committed` mirrors the value the outside world already knows about so we
 * only debounce real edits — including ones that come back from the URL.
 */
export function SearchField({
  value,
  onCommit,
  placeholder = "Search",
  className,
}: SearchFieldProps) {
  const [text, setText] = useState(value);
  const committed = useRef(value);

  useEffect(() => {
    if (value !== committed.current) {
      committed.current = value;
      setText(value);
    }
  }, [value]);

  useEffect(() => {
    if (text === committed.current) return;

    const timer = setTimeout(() => {
      committed.current = text;
      onCommit(text);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [text, onCommit]);

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(event) => {
        event.preventDefault();
        committed.current = text;
        onCommit(text);
      }}
    >
      <Input
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-11 rounded-xl border-border bg-card pr-10 pl-4 text-sm"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-1.5 text-foreground/55 transition-colors hover:text-foreground"
      >
        <Search className="size-4" />
      </button>
    </form>
  );
}
