import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { team } from "@/lib/team";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people behind curse — the Discord bot built to keep your server in order.",
};

function getInitials(name: string) {
  return name
    .split(/[\s_-]/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamPage() {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="The Team"
          title="Built by people who care."
          subtitle="curse is made by a small team of Discord enthusiasts who got tired of duct-taping five different bots together."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 70}>
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover ring-2 ring-border"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent/20 text-lg font-semibold text-accent ring-2 ring-accent/30"
                  >
                    {getInitials(member.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">
                    {member.name}
                  </p>
                  <p className="truncate text-sm text-accent">{member.role}</p>
                </div>
              </div>

              {/* Social links */}
              {member.socials && (
                <div className="flex items-center gap-2 border-t border-border pt-4">
                  {member.socials.github && (
                    <Link
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on GitHub`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <Github className="size-4" />
                    </Link>
                  )}
                  {member.socials.twitter && (
                    <Link
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on X / Twitter`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <Twitter className="size-4" />
                    </Link>
                  )}
                  {member.socials.discord && (
                    <Link
                      href={member.socials.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Discord`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <DiscordIcon className="size-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface/60 px-6 py-10 text-center">
          <p className="text-lg font-semibold text-foreground">
            Want to be part of this?
          </p>
          <p className="max-w-sm text-sm text-muted">
            We&rsquo;re always looking for passionate people. Reach out on our
            Discord server if you&rsquo;d like to contribute.
          </p>
          <ButtonLink href="/#" variant="ghost" size="md">
            Join the Discord
          </ButtonLink>
        </div>
      </Reveal>
    </Container>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}
