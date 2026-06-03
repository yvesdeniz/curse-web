import type { Metadata } from "next";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Moderation",
  description:
    "Bans, mutes, warnings, purges, and lockdowns reliable tools for server owners.",
};

export default function ModerationPage() {
  return (
    <Prose>
      <h1>Moderation</h1>
      <p>
        Moderation that actually works. Built for server owners who mean
        business simple to set up, powerful to use, and reliable enough to
        trust with your entire community.
      </p>

      <h2>Core commands</h2>
      <ul>
        <li>
          <code>,ban &lt;member&gt;</code>  remove a member and optionally
          delete their recent messages.
        </li>
        {/* <li>
          <code>,kick &lt;member&gt;</code> remove a member without a ban.
        </li> */}
        {/* <li>
          <code>,mute &lt;member&gt; &lt;duration&gt;</code> timeout a member
          for a set period.
        </li> */}
        <li>
          <code>,warn &lt;member&gt; &lt;reason&gt;</code> log a warning to the
          member&rsquo;s record.
        </li>
        <li>
          <code>,purge &lt;amount&gt;</code> bulk-delete recent messages.
        </li>
        {/* <li>
          <code>,lockdown</code> stop members from sending messages in a
          channel.
        </li> */}
      </ul>

      {/* <h2>Mod logging</h2>
      <p>
        Point curse at a private <code>#mod-log</code> channel during{" "}
        <code>,setup</code>. Every moderation action — who did it, to whom, and
        why — is recorded there automatically so your team always has an audit
        trail.
      </p> */}

      {/* <h2>Warning thresholds</h2>
      <p>
        Warnings accumulate on each member&rsquo;s record. You can configure
        automatic actions — like a mute or ban — once a member crosses a warning
        threshold, so repeat offenders are handled without manual effort.
      </p> */}
    </Prose>
  );
}
