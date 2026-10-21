import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Get the Ruko testing version",
  description: "How to install the Ruko testing version on an Android phone.",
};

export default function InstallPage() {
  return (
    <>
      <PageHead
        title="Get the testing version"
        lead="Ruko is in testing with a small group of families, on Android phones only. It isn't on the Play Store yet, so installing it takes a few extra taps. If you're testing with us, we'll set it up with you."
      />
      <section className="field">
        <div className="container">
          <p className="tag">Download link coming soon</p>
          <p className="measure">
            The download link will appear here when testing starts. Only install Ruko from this page or from someone on
            our team. <strong>Never install any app sent to you as a file on WhatsApp</strong>, including Ruko.
          </p>

          <h2 style={{ marginTop: 48 }}>Six steps</h2>
          <ol className="steps">
            <li>
              <strong>Download the file</strong> from the link on this page.
            </li>
            <li>
              <strong>Allow the install.</strong> Android asks whether your browser or Files app may install apps. Allow it
              for this one install.
            </li>
            <li>
              <strong>If Google Play Protect warns you,</strong> tap &ldquo;More details&rdquo;, then &ldquo;Install
              anyway&rdquo;. This happens because Ruko isn&rsquo;t on the Play Store yet.
            </li>
            <li>
              <strong>Open Ruko</strong> and follow the setup. It explains each permission before Android asks.
            </li>
            <li>
              <strong>If Android says &ldquo;Restricted setting&rdquo;:</strong> open <em>Settings → Apps → Ruko</em>, tap
              the <em>⋮</em> menu at the top right, choose <em>Allow restricted settings</em>, enter your phone&rsquo;s PIN,
              then go back to Ruko and turn the setting on.
            </li>
            <li>
              <strong>Keep Ruko running.</strong> Some phones close apps to save battery.{" "}
              <a href="/keep-running">Follow the battery steps for your phone</a>.
            </li>
          </ol>
          <p className="note">A one-minute video of these steps will be added here.</p>
          <h2 style={{ marginTop: 48 }}>Reviewers: see the family member&rsquo;s side</h2>
          <p>
            With one phone you can still see what the helper gets. In Ruko, choose <em>Help someone you love</em>, type the
            demo code <strong>000000</strong> and tap <em>Connect</em>, then lock the phone. Five seconds later it rings with a
            demo alert, exactly as a helper&rsquo;s phone does. Nothing is sent anywhere.
          </p>
        </div>
      </section>
    </>
  );
}
