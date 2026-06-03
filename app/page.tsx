import { ArrowRight, Gavel } from "lucide-react";
import { site } from "@/lib/site";
import { features } from "@/lib/features";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { GlowBackground } from "@/components/GlowBackground";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate">
        <GlowBackground />
        <Container className="flex flex-col items-center pt-24 pb-20 text-center sm:pt-32">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              All-in-one Discord moderation
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              The last discord bot
              <br className="hidden sm:block" /> you&rsquo;ll{" "}
              <span className="text-accent">ever</span> need.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Verification, moderation, fun, information, and economy - all in
              one. Whether you run a small community or a massive server, curse
              keeps everything under control without the hassle.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <ButtonLink href={site.inviteUrl} external size="lg">
                Add to Discord
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/commands" variant="ghost" size="lg">
                View commands
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 text-sm text-faint">
              Free to add · Set up in under a minute · Trusted by server owners
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Features */}
      <section id="features" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Everything in one bot"
              title="Five toolkits. One install."
              subtitle="Stop juggling five different bots. curse handles the entire lifecycle of your server — from the moment someone joins to the day they top the leaderboard."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 70}>
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------- Spotlight: Moderation */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <ModerationMock />
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="Moderation"
                title="Moderation that actually works."
                subtitle="Built for server owners who mean business. Simple to set up, powerful to use, and reliable enough to trust with your entire community."
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- CTA band */}
      <section className="relative isolate py-20">
        <div aria-hidden className="glow pointer-events-none absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface/60 px-6 py-16 text-center backdrop-blur">
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Bring curse to your server today.
              </h2>
              <p className="max-w-md text-pretty text-muted">
                Add the bot, run the setup, and hand your community the
                protection it deserves.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <ButtonLink href={site.inviteUrl} external size="lg">
                  Add to Discord
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/docs/getting-started" variant="ghost" size="lg">
                  Read the docs
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

/* ------------------------------------------------------------ Mock visuals */

function ModerationMock() {
  const log = [
    { cmd: ",ban", target: "@raider_4821", note: "spam · raid" },
    { cmd: ",mute", target: "@loud_guy", note: "30m · spam" },
    { cmd: ",purge", target: "40 messages", note: "#general" },
    { cmd: ",warn", target: "@newbie", note: "self-promo" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 font-mono text-sm shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Gavel className="size-4 text-accent" />
        <span className="text-xs text-faint">mod-log</span>
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {log.map((entry, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="rounded-md bg-accent/15 px-1.5 py-0.5 text-xs text-accent">
              {entry.cmd}
            </span>
            <span className="text-foreground">{entry.target}</span>
            <span className="ml-auto text-xs text-faint">{entry.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
