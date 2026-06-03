import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Prose } from "@/components/Prose";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Add curse to your server and finish setup in under a minute.",
};

export default function GettingStartedPage() {
  return (
    <Prose>
      <h1>Getting started</h1>
      <p>
        curse is the only moderation bot your server will ever need —
        verification, moderation, information, economy, and fun, all in one.
        This guide gets you from zero to protected in three steps.
      </p>

      <h2>1. Add the bot</h2>
      <p>
        Invite curse to your server with the <strong>Add to Discord</strong>{" "}
        button. You&rsquo;ll need the <code>Manage Server</code> permission on
        the server you want to add it to.
      </p>
      <p>
        <ButtonLink href={site.inviteUrl} external size="md">
          Add to Discord
        </ButtonLink>
      </p>

      <h2>2. Run the setup</h2>
      <p>
        Once curse joins, run <code>,setup</code> in any channel. The bot walks
        you through enabling the modules you want and pointing it at your log
        channels.
      </p>

      <h2>3. Turn on verification</h2>
      <p>
        Run <code>,verify setup</code> to create your verification panel and
        choose the role members receive once they pass. New joiners will be
        gated behind a single click — see{" "}
        <a href="/docs/verification">Verification</a> for details.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li>
          see rest at.{" "}
          <a href="/commands">commands</a>.
        </li>
        {/* <li>
          Enable the economy and fun modules — see{" "}
          <a href="/docs/economy-and-fun">Economy &amp; Fun</a>.
        </li>
        <li>
          Fine-tune permissions and channels — see{" "}
          <a href="/docs/configuration">Configuration</a>.
        </li> */}
      </ul>
    </Prose>
  );
}
