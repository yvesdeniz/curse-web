import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Prose } from "@/components/Prose";
import { getChangelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every release of curse — new commands, improvements, and fixes, newest first.",
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ChangelogPage() {
  const entries = getChangelog();

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Changelog"
        title="What's new"
        subtitle="Every release of curse — new commands, improvements, and fixes. Newest first."
      />

      <ol className="relative mt-12 flex flex-col gap-12 border-l border-border pl-8 sm:pl-10">
        {entries.map((entry, i) => (
          <Reveal as="li" key={entry.slug} delay={i * 70} className="relative">
            {/* Timeline node, centered on the rail */}
            <span
              aria-hidden
              className="absolute -left-[2.3125rem] top-1.5 sm:-left-[2.8125rem]"
            >
              <span className="absolute -inset-1.5 rounded-full bg-accent/15" />
              <span className="relative block size-2.5 rounded-full bg-accent ring-4 ring-background" />
            </span>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                v{entry.version}
              </span>
              {entry.title ? (
                <span className="text-sm font-medium text-foreground">
                  {entry.title}
                </span>
              ) : null}
              <time dateTime={entry.date} className="text-xs text-faint">
                {dateFmt.format(new Date(entry.date))}
              </time>
            </div>

            <Prose className="mt-4">
              <div dangerouslySetInnerHTML={{ __html: entry.html }} />
            </Prose>
          </Reveal>
        ))}
      </ol>
    </Container>
  );
}
