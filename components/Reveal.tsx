"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entrance wrapper: fade + rise + de-blur when scrolled into view.
 * Honors prefers-reduced-motion (CSS disables the transition there).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      data-reveal={shown ? "shown" : ""}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={className}
    >
      {children}
    </Component>
  );
}
