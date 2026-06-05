import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { supporters } from "@/lib/supporters";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Supporters",
  description: "The people and communities who keep curse running. Thank you.",
};

export default function SupportersPage() {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Supporters"
          title="Thank you."
          subtitle="curse is free for everyone, made possible by the generosity of these amazing people."
        />
      </Reveal>

      {supporters.length > 0 ? (
        <Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            {supporters.map((supporter) =>
              supporter.href ? (
                <Link
                  key={supporter.name}
                  href={supporter.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  <Heart className="size-3 text-accent" aria-hidden />
                  {supporter.name}
                </Link>
              ) : (
                <span
                  key={supporter.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
                >
                  <Heart className="size-3 text-accent" aria-hidden />
                  {supporter.name}
                </span>
              )
            )}
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <Heart className="size-8 text-accent/40" />
            <p className="text-sm text-muted">
              No supporters listed yet — be the first!
            </p>
          </div>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface/60 px-6 py-10 text-center">
          <p className="text-lg font-semibold text-foreground">
            Want to support curse?
          </p>
          <p className="max-w-sm text-sm text-muted">
            curse is free to use. If you&rsquo;d like to show your support and get
            your name on this page, reach out on our Discord server.
          </p>
          <ButtonLink href={site.inviteUrl} external size="md">
            Add to Discord
          </ButtonLink>
        </div>
      </Reveal>
    </Container>
  );
}
