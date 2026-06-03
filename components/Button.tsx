import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.98] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-[0_0_0_1px_rgba(139,124,246,0.3),0_8px_30px_-12px_rgba(139,124,246,0.7)]",
  ghost:
    "border border-border bg-surface/40 text-foreground hover:bg-surface-2 hover:border-faint",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-button=""
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-button="">
      {children}
    </Link>
  );
}
