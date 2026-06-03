import { cn } from "@/lib/cn";

/**
 * Documentation prose styling. Content is authored as plain TSX children;
 * these descendant selectors give it consistent, on-theme typography
 * without an MDX toolchain.
 */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl text-[15px] leading-relaxed text-muted",
        "[&_h1]:mb-3 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:my-4",
        "[&_a:not([data-button])]:text-accent [&_a:not([data-button])]:underline [&_a:not([data-button])]:underline-offset-4 hover:[&_a:not([data-button])]:text-accent-hover",
        "[&_ul]:my-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-1",
        "[&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:size-1.5 [&_li]:before:-translate-y-1/2 [&_li]:before:rounded-full [&_li]:before:bg-accent",
        "[&_code]:rounded-md [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
