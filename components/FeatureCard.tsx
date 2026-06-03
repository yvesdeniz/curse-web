import type { Feature } from "@/lib/features";

export function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, title, blurb } = feature;
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-faint hover:bg-surface-2">
      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background text-accent transition-colors duration-200 group-hover:border-accent/40">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{blurb}</p>
      </div>
    </div>
  );
}
