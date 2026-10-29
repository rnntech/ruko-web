import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Ruko privacy: what Ruko sees and never does",
  description: "Exactly what the Ruko app can see on your phone, what it never does, and what leaves your phone.",
};

const permissions: { name: string; sees: string; why: string }[] = [
  { name: "Caller ID & spam app", sees: "The number of incoming calls", why: "To tell a saved contact from a stranger" },
  { name: "Phone", sees: "Whether a call is on, and for how long", why: "To notice the minutes after a call, and very long calls if you turn that on" },
  { name: "Contacts", sees: "Whether a caller is saved in your contacts", why: "Calls from saved contacts never trigger a warning" },
  {
    name: "Usage access",
    sees: "Which app is open, only during calls with unknown numbers, and for 30 minutes after a scam app file arrives",
    why: "To notice when your bank or payment app opens during a call, and when someone starts installing an app file Ruko warned about",
  },
  { name: "Display over other apps", sees: "Nothing", why: "To show the red warning on top of other apps" },
  { name: "Notifications", sees: "Nothing", why: "To show “Ruko is protecting you” and tell you if protection is off" },
  {
    name: "Notification access (full app only)",
    sees: "Short previews of your notifications",
    why: "To spot WhatsApp calls from unknown numbers, bank texts during a risky call, and scam messages in SMS, WhatsApp, Telegram, Instagram, Messenger, Truecaller and SMS Organizer. Checked on your phone only",
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
              services) and are never stored or sent by Ruko.
            </li>
            <li>
              Ruko uses the internet to download the latest list of scams going around. In &ldquo;Tell them automatically&rdquo;, it also tells our server every few hours that it is still running (only a code for your pairing and the time), so your helper is told if Ruko stops for a day. In &ldquo;Just me&rdquo; and
              &ldquo;Ask me first&rdquo;, that is all, unless you turn on &ldquo;Also check websites online&rdquo; (only
              the website&rsquo;s name goes to Google), &ldquo;Check how new a website is&rdquo; (only the website&rsquo;s
              name goes to the public register of website names, RDAP), &ldquo;Check where short links lead&rdquo; (only
              the short link goes to the service that made it, such as bit.ly, as tapping it would) or &ldquo;Tell [your helper] about very long calls&rdquo;.
            </li>
            <li>
              &ldquo;Scam of the week&rdquo; uses the scam alerts already inside the app. Sharing a scam on WhatsApp opens
              WhatsApp&rsquo;s own share screen; Ruko doesn&rsquo;t see who you send it to.
            </li>
          </ul>
          <h2 style={{ marginTop: 56 }}>Only if you choose &ldquo;Tell them automatically&rdquo;</h2>
          <p className="measure">
            In this mode, when Ruko warns you, it rings the phone of the person you chose so they can call you. To do that,
            Ruko&rsquo;s server receives: a random ID for you and for them (no name, email or phone number), which kind of
            warning it was (for example &ldquo;long call with a stranger&rdquo;), a score, and the time. The other phone gets
            a push message through Google&rsquo;s Firebase. Never your calls, messages, contacts or numbers. Your helper
            sees only &ldquo;Please call you now&rdquo;, plus the kind of warning if you turned on &ldquo;Also tell them
            why&rdquo;. Either of you can disconnect at any time in Settings. The long-call alert, if you turn it on,
            works the same way in any mode.
          </p>
          <h2 style={{ marginTop: 56 }}>When you answer &ldquo;Was this a scam?&rdquo;</h2>
          <p className="measure">
            After a warning, Home asks whether it was a scam. Your answer (yes, no or not sure) is sent with only the kind of
            warning and the app version, so we can see which warnings are wrong and fix them. <strong>You can turn this off</strong>{" "}
            in Settings &rarr; &ldquo;Share my &lsquo;Was this a scam?&rsquo; answers&rdquo;; then nothing is sent. It is stored without any
            ID, so it can&rsquo;t be traced to you or your phone. Never your name, number, messages or calls.
          </p>
          <h2 style={{ marginTop: 56 }}>Only if you write to us</h2>
          <p className="measure">
            Settings &rarr; Help &amp; feedback (and &ldquo;Tell us&rdquo; after you say a warning was wrong) opens your own
            email app with a draft to the Ruko team. Ruko sends nothing by itself: you see the whole email and decide
            whether to send it. The draft adds only the app version, your phone model and Android version, the language,
            whether protection is on, your helper mode and, for a wrong warning, which kind of warning it was. Never your
            messages, calls, contacts or numbers. We use what you send only to answer you and to fix Ruko.
          </p>
          <h2 style={{ marginTop: 56 }}>Deleting your data</h2>
          <p className="measure">
            Everything Ruko keeps is on your phone: your settings, the person you chose to call, scrambled codes of numbers
            you trust, and a small test log of warnings (no names, numbers or messages). <strong>Uninstalling Ruko deletes
            all of it.</strong> To clear only the test log, open Ruko → Settings → Setup check. If you used &ldquo;Tell them
            automatically&rdquo;, &ldquo;Disconnect&rdquo; in Settings ends the link at once; the server then keeps only the
            random IDs and alert times, with nothing that names you, and they will be deleted on request.
          </p>
          <h2 style={{ marginTop: 56 }}>During testing</h2>
          <p className="measure">
            The testing version keeps everything on your phone and sends nothing about you to any server, unless you turn
            on &ldquo;Tell them automatically&rdquo; (above). To remove everything, uninstall Ruko.
          </p>
        </div>
      </section>
    </>
  );
}
