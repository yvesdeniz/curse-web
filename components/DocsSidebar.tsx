"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-faint">
        Documentation
      </p>
      {docsNav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-accent/15 font-medium text-foreground"
                : "text-muted hover:bg-surface hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
