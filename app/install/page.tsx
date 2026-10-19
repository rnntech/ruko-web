import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get the Ruko testing version",
  description: "How to install the Ruko testing version on an Android phone.",
};

export default function InstallPage() {
  return (
    <section className="section" style={{ borderTop: "none" }}>
      <div className="container">
        <h1>Get the testing version</h1>
        <p className="lead">
          Ruko is in testing with a small group of families. It works on Android phones only. It isn&rsquo;t on the Play
          Store yet, so installing it takes a few extra taps. We&rsquo;ll help you set it up in person if you&rsquo;re
          testing with us.
        </p>

        <p className="label">Download link coming soon</p>
        <p className="note" style={{ maxWidth: "62ch" }}>
          The download link will appear here when testing starts. Only install Ruko from this page or from someone on
          our team. Never install any app sent to you as a file on WhatsApp, including Ruko.
        </p>

        <h2 style={{ marginTop: 32 }}>Steps</h2>
        <ol className="steps">
          <li>
            <strong>Download the file</strong> from the link on this page.
          </li>
          <li>
            <strong>Allow the install.</strong> Android will ask whether to let your browser or Files app install apps.
            Allow it for this one install.
          </li>
          <li>
            <strong>If Google Play Protect shows a warning,</strong> tap &ldquo;More details&rdquo;, then &ldquo;Install
            anyway&rdquo;. This happens because Ruko isn&rsquo;t on the Play Store yet.
          </li>
          <li>
            <strong>Open Ruko</strong> and follow the setup. It explains each permission before Android asks.
          </li>
          <li>
            <strong>If Android blocks a setting</strong> (it may say &ldquo;Restricted setting&rdquo;): open{" "}
            <em>Settings → Apps → Ruko</em>, tap the <em>⋮</em> menu at the top right, choose{" "}
            <em>Allow restricted settings</em>, enter your phone&rsquo;s PIN, then go back to Ruko and turn the setting on.
          </li>
        </ol>
        <p className="note">A one-minute video of these steps will be added here.</p>
      </div>
    </section>
  );
}
