import type { Metadata } from "next";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Verification",
  description:
    "Gate new members behind a one-click verification flow to stop raiders and alts.",
};

export default function VerificationPage() {
  return (
    <Prose>
      <h1>Verification</h1>
      <p>
        Verification stops raiders and alt accounts in their tracks. curse sends
        every new member through a smooth one-click flow before they get access
        to your server.
      </p>

      <h2>How it works</h2>
      <ul>
        <li>New members land in a restricted state with no channel access.</li>
        <li>
          They see your verification panel and click a single{" "}
          <strong>Verify</strong> button.
        </li>
        <li>
          curse runs its checks and assigns the verified role the moment they
          pass.
        </li>
      </ul>

      <h2>Setup</h2>
      <p>
        Run <code>,setupverify &lt;#channel&gt; &lt;@role&gt; </code> and choose the role members should receive
        once verified.
      </p>

      {/* <h3>Manual override</h3>
      <p>
        Need to let someone through by hand? Use{" "}
        <code>,verify bypass &lt;member&gt;</code> to mark them as verified
        instantly.
      </p> */}

      <h2>Recommended setup</h2>
      <ul>
        <li>
          Create a single <code>#verify</code> channel visible only to
          unverified members.
        </li>
        <li>
          Restrict every other channel to the verified role so unverified users
          see nothing else.
        </li>
        <li>Keep the panel message pinned so it&rsquo;s always reachable.</li>
      </ul>
    </Prose>
  );
}
