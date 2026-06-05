import {
  ShieldCheck,
  Gavel,
  Settings,
  Terminal,
  Coins,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export type CommandCategory =
  | "Moderation"
  | "Core"
  | "Verification"
  | "Dev"
  | "Economy"
  | "Fun";

export type Command = {
  name: string;
  category: CommandCategory;
  description: string;
  usage: string;
};

export type CategoryMeta = {
  name: CommandCategory;
  icon: LucideIcon;
  /** Marketed but not shipped yet — rendered as a "coming soon" section. */
  comingSoon?: boolean;
};

/** Category order + icons, mirroring the bot's own `,help` output. */
export const categoryMeta: CategoryMeta[] = [
  { name: "Moderation", icon: Gavel },
  { name: "Core", icon: Settings },
  { name: "Verification", icon: ShieldCheck },
  { name: "Dev", icon: Terminal },
  { name: "Economy", icon: Coins, comingSoon: true },
  { name: "Fun", icon: Gamepad2, comingSoon: true },
];

/** Command reference. The bot prefix is ",". */
export const commands: Command[] = [
  // ---------------------------------------------------------- Moderation
  {
    name: ",ban",
    category: "Moderation",
    description: "Ban a member, optionally deleting their recent messages.",
    usage: ",ban <member> [reason] [delete_days]",
  },
  {
    name: ",unban",
    category: "Moderation",
    description: "Lift a ban and let a user rejoin the server.",
    usage: ",unban <user> [reason]",
  },
  {
    name: ",kick",
    category: "Moderation",
    description: "Remove a member from the server.",
    usage: ",kick <member> [reason]",
  },
  {
    name: ",mute",
    category: "Moderation",
    description: "Timeout a member for a set duration.",
    usage: ",mute <member> <duration> [reason]",
  },
  {
    name: ",unmute",
    category: "Moderation",
    description: "Lift a member's timeout early.",
    usage: ",unmute <member> [reason]",
  },
  {
    name: ",warn",
    category: "Moderation",
    description: "Issue a warning that's logged to the member's record.",
    usage: ",warn <member> <reason>",
  },
  {
    name: ",warnings",
    category: "Moderation",
    description: "Review a member's full warning history.",
    usage: ",warnings [member]",
  },
  {
    name: ",purge",
    category: "Moderation",
    description: "Bulk-delete messages in the current channel.",
    usage: ",purge <amount> [member]",
  },
  {
    name: ",nuke",
    category: "Moderation",
    description: "Clone and recreate a channel to wipe every message instantly.",
    usage: ",nuke [channel]",
  },
  {
    name: ",jail",
    category: "Moderation",
    description: "Lock a member into a restricted jail role until released.",
    usage: ",jail <member> [reason]",
  },
  {
    name: ",role",
    category: "Moderation",
    description: "Add or remove a role from a member.",
    usage: ",role <member> <role>",
  },
  {
    name: ",forcenick",
    category: "Moderation",
    description: "Lock a member to a fixed nickname they can't change.",
    usage: ",forcenick <member> <nickname>",
  },
  {
    name: ",unforcenick",
    category: "Moderation",
    description: "Release a locked nickname so the member can set their own.",
    usage: ",unforcenick <member>",
  },

  // ---------------------------------------------------------------- Core
  {
    name: ",userinfo",
    category: "Core",
    description: "Show account details, roles, and join date for a member.",
    usage: ",userinfo [member]",
  },
  {
    name: ",serverinfo",
    category: "Core",
    description: "Display server stats, owner, and creation date.",
    usage: ",serverinfo",
  },
  {
    name: ",help",
    category: "Core",
    description: "Browse every command and how to use it.",
    usage: ",help [category|command]",
  },

  // -------------------------------------------------------- Verification
  {
    name: ",setupverify",
    category: "Verification",
    description: "Create the verification panel and set the verified role.",
    usage: ",setupverify <role> [channel]",
  },
  {
    name: ",restore",
    category: "Verification",
    description: "Restore a returning member's previous roles.",
    usage: ",restore <member>",
  },

  // ----------------------------------------------------------------- Dev
  {
    name: ",cog",
    category: "Dev",
    description: "Load, reload, or unload a bot module at runtime.",
    usage: ",cog <load|reload|unload> <name>",
  },
  {
    name: ",eval",
    category: "Dev",
    description: "Evaluate code in the bot runtime (owner only).",
    usage: ",eval <code>",
  },
  {
    name: ",botinfo",
    category: "Dev",
    description: "Show bot uptime, version, and runtime stats.",
    usage: ",botinfo",
  },
];
