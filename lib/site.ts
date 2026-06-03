/**
 * Single source of truth for site-wide config: name, nav links, invite URL.
 */
export const site = {
  name: "curse",
  tagline: "The last moderation bot you'll ever need.",
  description:
    "All-in-one Discord moderation: verification, moderation, information, economy, and fun. Keep your server under control without the hassle.",
  // CTA target — wire a real Discord OAuth/invite URL via env when ready.
  inviteUrl: process.env.NEXT_PUBLIC_INVITE_URL ?? "#",
  nav: [
    { label: "Features", href: "/#features" },
    { label: "Commands", href: "/commands" },
    { label: "Docs", href: "/docs/getting-started" },
  ],
} as const;

export const docsNav = [
  { label: "Getting started", href: "/docs/getting-started" },
  // { label: "Verification", href: "/docs/verification" },
  // { label: "Moderation", href: "/docs/moderation" },
  // { label: "Economy & Fun", href: "/docs/economy-and-fun" },
  // { label: "Configuration", href: "/docs/configuration" },
] as const;
