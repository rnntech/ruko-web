import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Ruko privacy: what Ruko sees and never does",
  description: "Exactly what the Ruko app can see on your phone, what it never does, and what leaves your phone.",
};

const permissions: { name: string; sees: string; why: string }[] = [
  { name: "Caller ID & spam app", sees: "The number of incoming calls", why: "To tell a saved contact from a stranger" },
  { name: "Phone", sees: "Whether a call is on, and for how long", why: "To notice very long calls and the minutes after a call" },
  { name: "Contacts", sees: "Whether a caller is saved in your contacts", why: "Saved contacts never trigger a warning" },
  { name: "Usage access", sees: "Which app is open, only during calls with unknown numbers", why: "To notice when your bank or payment app opens" },
  { name: "Display over other apps", sees: "Nothing", why: "To show the red warning on top of other apps" },
  { name: "Notifications", sees: "Nothing", why: "To show “Ruko is protecting you” and tell you if protection is off" },
  {
    name: "Notification access (optional)",
    sees: "Short previews of your notifications",
    why: "To spot WhatsApp calls from unknown numbers, bank texts during a risky call, and scam messages. Checked on your phone only",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        title="What Ruko sees, and what it never does"
        lead="Ruko asks for strong permissions, the same kind scam apps ask for. So here is exactly what each one is for."
      />
      <section className="field">
        <div className="container">
          <h2>Permissions</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Permission</th>
                  <th scope="col">What Ruko can see</th>
                  <th scope="col">Why</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <strong>{p.name}</strong>
                    </td>
                    <td>{p.sees}</td>
                    <td>{p.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="field field-white">
        <div className="container">
          <h2>Ruko never</h2>
          <ul className="rows">
            <li>Listens to or records your calls.</li>
            <li>Stores or sends the text of your messages.</li>
            <li>Copies or uploads your contacts.</li>
            <li>Asks for your SMS, call history, microphone, location or accessibility settings.</li>
            <li>Blocks your calls or payments. It only warns you.</li>
            <li>Stores your family safe word. Agree on it in person; don&rsquo;t type it anywhere.</li>
          </ul>
        </div>
      </section>

      <section className="field">
        <div className="container">
          <h2>What stays on your phone</h2>
          <ul className="rows">
            <li>Every check of calls, apps and messages happens on your phone.</li>
            <li>The name and number of the person you choose to call stay on your phone.</li>
            <li>Numbers you mark &ldquo;I know this caller&rdquo; are kept only as a scrambled code (a hash), not as the number.</li>
            <li>
              Screenshots you check are read on your phone by Google&rsquo;s on-device text reader (through Google Play
              services) and are never stored or sent by Ruko. The testing version of Ruko has no internet permission at all.
            </li>
            <li>
              &ldquo;Scam of the week&rdquo; uses the scam alerts already inside the app. Sharing a scam on WhatsApp opens
              WhatsApp&rsquo;s own share screen; Ruko doesn&rsquo;t see who you send it to.
            </li>
          </ul>
          <h2 style={{ marginTop: 56 }}>Deleting your data</h2>
          <p className="measure">
            Everything Ruko keeps is on your phone: your settings, the person you chose to call, scrambled codes of numbers
            you trust, and a small test log of warnings (no names, numbers or messages). <strong>Uninstalling Ruko deletes
            all of it.</strong> To clear only the test log, open Ruko → Settings → Setup check. When Ruko starts using a
            server for helper alerts, this page will explain how to delete anything kept there, and you&rsquo;ll be able to
            do it from the app.
          </p>
          <h2 style={{ marginTop: 56 }}>During testing</h2>
          <p className="measure">
            The testing version keeps everything on your phone and sends nothing about you to any server. To remove
            everything, uninstall Ruko. If we later add a feature that sends anything (for example, alerting the person
            you chose), this page will say exactly what is sent before you can turn it on.
          </p>
        </div>
      </section>
    </>
  );
}
