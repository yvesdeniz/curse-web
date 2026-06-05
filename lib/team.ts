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
    name: "yvesdeniz",
    role: "Founder & Lead Developer",
    socials: {
      github: "https://github.com/yvesdeniz",
    },
  },
  // Add more team members here
];
