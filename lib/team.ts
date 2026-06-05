export type SocialLinks = {
  github?: string;
  discord?: string;
  twitter?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  avatar?: string; // URL — omit to show initials fallback
  socials?: SocialLinks;
};

export const team: TeamMember[] = [
  {
    name: "deniz",
    role: "Founder & Lead Developer",
    avatar: "https://api.alo.ne/file/i6b1zb",
    socials: {
      discord: "https://discord.com/users/1306505500699000856",
      github: "https://github.com/yvesdeniz",
    },
  },
  {
    name: "paunic",
    role: "Developer",
    avatar: "https://cdn.discordapp.com/avatars/852670185088221204/2bdae7c325dea23c874dbf234110718f.png?size=4096",
    socials: {
      discord: "https://discord.com/users/852670185088221204"
    }
  },
];
