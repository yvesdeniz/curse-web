import type { Metadata } from "next";
import Link from "next/link";
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
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
                  {member.socials.instagram && (
                    <Link
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Instagram`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <InstagramIcon className="size-4" />
                    </Link>
                  )}
                  {member.socials.site && (
                    <Link
                      href={member.socials.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.socials.site}`}
                      className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <BrowserIcon className="size-4" />
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
          <ButtonLink href="https://discord.gg/yf8PySefGS" variant="ghost" size="md">
            Join the Discord
          </ButtonLink>
        </div>
      </Reveal>
    </Container>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24em" height="24em" viewBox="0 0 24 24" aria-hidden className={className}>
	    <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"></path>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24em" height="24em" viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
    </svg>
  );
}

function BrowserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24em" height="24em" viewBox="0 0 20 20" aria-hidden className={className}>
      <path fill="currentColor" d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0m3.46 11.95c0 1.47-.8 3.3-4.06 4.7c.3-4.17-2.52-3.69-3.2-5A3.25 3.25 0 0 1 7 9.1a8.5 8.5 0 0 1-4.18-2c.05.47.279.904.64 1.21a4.2 4.2 0 0 1-1.94-1.5a7.94 7.94 0 0 1 7.25-5.63c-.84 1.38-1.5 4.13 0 5.57C7.23 7 6.26 5 5.41 5.79c-1.13 1.06.33 2.51 3.42 3.08c3.29.59 3.66 1.58 3.63 3.08m1.34-4c-.32-1.11.62-2.23 1.69-3.14a7.27 7.27 0 0 1 .84 6.68c-.77-1.89-2.17-2.32-2.53-3.57z"></path>
    </svg>
  );
}
