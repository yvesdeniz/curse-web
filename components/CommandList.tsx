"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, Sparkles } from "lucide-react";
import {
  commands,
  categoryMeta,
  type CommandCategory,
} from "@/lib/commands";
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

  const activeMeta =
    filter === "All" ? null : categoryMeta.find((c) => c.name === filter);
  const showingComingSoon = activeMeta?.comingSoon ?? false;

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
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by category"
      >
        <CategoryPill
          label="All"
          icon={Sparkles}
          active={filter === "All"}
          onClick={() => setFilter("All")}
        />
        {categoryMeta.map((cat) => (
          <CategoryPill
            key={cat.name}
            label={cat.name}
            icon={cat.icon}
            comingSoon={cat.comingSoon}
            active={filter === cat.name}
            onClick={() => setFilter(cat.name)}
          />
        ))}
      </div>

      {/* Results */}
      {showingComingSoon ? (
        <ComingSoon category={filter as CommandCategory} />
      ) : results.length > 0 ? (
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

function CategoryPill({
  label,
  icon: Icon,
  active,
  comingSoon,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  comingSoon?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-accent/50 bg-accent/15 text-foreground"
          : "border-border bg-surface text-muted hover:text-foreground",
      )}
    >
      <Icon className="size-3.5" />
      {label}
      {comingSoon ? (
        <span className="rounded-full bg-surface-2 px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-faint">
          soon
        </span>
      ) : null}
    </button>
  );
}

function ComingSoon({ category }: { category: CommandCategory }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 py-16 text-center">
      <Sparkles className="size-6 text-accent" />
      <p className="text-sm text-foreground">
        {category} commands are on the way.
      </p>
      <p className="max-w-sm text-sm text-muted">
        This module isn&rsquo;t live yet — follow the{" "}
        <a
          href="/changelog"
          className="text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          changelog
        </a>{" "}
        to know the moment it ships.
      </p>
    </div>
  );
}
