export type Supporter = {
  name: string;
  href?: string; // optional link (GitHub, Discord profile, etc.)
};

export const supporters: Supporter[] = [
  {
    name: "oddstan",
    href: "https://discord.gg/ZMSQcaNyp"
  }
];
