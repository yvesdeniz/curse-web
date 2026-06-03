export type CommandCategory =
  | "Verification"
  | "Moderation"
  | "Information"
  | "Economy"
  | "Fun";

export type Command = {
  name: string;
  category: CommandCategory;
  description: string;
  usage: string;
};

export const categories: CommandCategory[] = [
  "Verification",
  "Moderation",
  "Information",
  "Economy",
  "Fun",
];

/** Command reference. The bot prefix is "," — edit freely. */
export const commands: Command[] = [
  // Verification
  {
    name: ",setupverify setup",
    category: "Verification",
    description: "Create the verification panel and configure the verified role.",
    usage: ",verify setup <role> [channel]",
  },
  // {
  //   name: ",verify panel",
  //   category: "Verification",
  //   description: "Post or refresh the one-click verification button.",
  //   usage: ",verify panel [channel]",
  // },
  // {
  //   name: ",verify bypass",
  //   category: "Verification",
  //   description: "Manually mark a member as verified.",
  //   usage: ",verify bypass <member>",
  // },

  // Moderation
  {
    name: ",ban",
    category: "Moderation",
    description: "Ban a member, optionally deleting their recent messages.",
    usage: ",ban <member> [reason] [delete_days]",
  },
  // {
  //   name: ",kick",
  //   category: "Moderation",
  //   description: "Remove a member from the server.",
  //   usage: ",kick <member> [reason]",
  // },
  // {
  //   name: ",mute",
  //   category: "Moderation",
  //   description: "Timeout a member for a set duration.",
  //   usage: ",mute <member> <duration> [reason]",
  // },
  {
    name: ",warn",
    category: "Moderation",
    description: "Issue a warning that's logged to the member's record.",
    usage: ",warn <member> <reason>",
  },
  {
    name: ",purge",
    category: "Moderation",
    description: "Bulk-delete messages in the current channel.",
    usage: ",purge <amount> [member]",
  },
  // {
  //   name: ",lockdown",
  //   category: "Moderation",
  //   description: "Lock a channel so members can no longer send messages.",
  //   usage: ",lockdown [channel] [reason]",
  // },

  // Information
  {
    name: ",userinfo",
    category: "Information",
    description: "Show account details, roles, and join date for a member.",
    usage: ",userinfo [member]",
  },
  {
    name: ",serverinfo",
    category: "Information",
    description: "Display server stats, owner, and creation date.",
    usage: ",serverinfo",
  },
  {
    name: ",help",
    category: "Information",
    description: "Browse every command and how to use it.",
    usage: ",help [command]",
  },

  // Economy
  // {
  //   name: ",balance",
  //   category: "Economy",
  //   description: "Check your wallet and bank balance.",
  //   usage: ",balance [member]",
  // },
  // {
  //   name: ",daily",
  //   category: "Economy",
  //   description: "Claim your daily coin reward.",
  //   usage: ",daily",
  // },
  // {
  //   name: ",shop",
  //   category: "Economy",
  //   description: "Browse and buy items from the server shop.",
  //   usage: ",shop [page]",
  // },
  // {
  //   name: ",pay",
  //   category: "Economy",
  //   description: "Send coins to another member.",
  //   usage: ",pay <member> <amount>",
  // },

  // // Fun
  // {
  //   name: ",8ball",
  //   category: "Fun",
  //   description: "Ask the magic 8-ball a yes/no question.",
  //   usage: ",8ball <question>",
  // },
  // {
  //   name: ",meme",
  //   category: "Fun",
  //   description: "Pull a fresh meme into the channel.",
  //   usage: ",meme",
  // },
  // {
  //   name: ",rps",
  //   category: "Fun",
  //   description: "Play rock-paper-scissors against the bot.",
  //   usage: ",rps <choice>",
  // },
];
