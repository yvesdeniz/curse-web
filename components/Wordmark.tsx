import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * The curse wordmark: the icon.svg mark tilted like a slash, sitting on top of
 * the top-left of the name. Inlined so it inherits `currentColor`.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block select-none pt-1.5 text-lg font-semibold lowercase tracking-tight text-foreground",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 40 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -left-5 top-1 h-[1.15em] w-auto -rotate-[32deg] text-foreground"
      >
        <path d="M7 8 14 12 7 16" />
        <path d="M33 8 26 12 33 16" />
        <circle cx="20" cy="14" r="2" fill="#8b7cf6" stroke="none" />
      </svg>
      {site.name}
      <span className="text-accent">.</span>
    </span>
  );
}
