import {
  ShieldCheck,
  Gavel,
  Info,
  Coins,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

/** The five pillars of curse — used on the landing feature grid. */
export const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Verification",
    blurb:
      "Stop raiders and alt accounts cold with a smooth one-click verification flow before anyone gets access.",
  },
  {
    icon: Gavel,
    title: "Moderation",
    blurb:
      "Bans, mutes, warnings, purges, and lockdowns — fast, reliable tools for owners who mean business.",
  },
  {
    icon: Info,
    title: "Information",
    blurb:
      "Instant user, role, and server insights so you always know exactly what's happening in your community.",
  },
  {
    icon: Coins,
    title: "Economy",
    blurb:
      "A full economy with balances, dailies, shops, and payments to keep members coming back every day.",
  },
  {
    icon: Gamepad2,
    title: "Fun",
    blurb:
      "Games, rolls, and lighthearted commands that keep your server lively between the serious stuff.",
  },
];
