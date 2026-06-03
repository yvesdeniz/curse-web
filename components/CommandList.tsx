"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { commands, categories, type CommandCategory } from "@/lib/commands";
import { cn } from "@/lib/cn";

type Filter = "All" | CommandCategory;

export function CommandList() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commands.filter((c) => {
      const matchesCategory = filter === "All" || c.category === filter;
      const matchesQuery =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  const tabs: Filter[] = ["All", ...categories];

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands…"
          aria-label="Search commands"
          className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent/60 focus-visible:outline-none"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {tabs.map((tab) => {
          const active = filter === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(tab)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-accent/50 bg-accent/15 text-foreground"
                  : "border-border bg-surface text-muted hover:text-foreground",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {results.map((c) => (
            <li
              key={c.name}
              className="flex flex-col gap-2 p-4 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:gap-6"
            >
              <code className="w-fit rounded-md bg-accent/15 px-2 py-1 font-mono text-sm text-accent">
                {c.name}
              </code>
              <p className="flex-1 text-sm text-muted">{c.description}</p>
              <code className="font-mono text-xs text-faint">{c.usage}</code>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 py-16 text-center">
          <SearchX className="size-6 text-faint" />
          <p className="text-sm text-muted">
            No commands match{" "}
            <span className="text-foreground">&ldquo;{query}&rdquo;</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
            className="text-sm text-accent hover:text-accent-hover"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
