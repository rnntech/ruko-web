import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Concept: a family check inside your bank's transfer",
  description: "A concept for where Ruko goes next: a family check built into the bank's transfer process.",
};

export default function BankConceptPage() {
  return (
    <>
      <PageHead
        tag="Concept, not built yet"
        title="A family check inside your bank's transfer"
        lead="An app can only warn you. Only a bank can actually hold the money. This is where Ruko could go next."
      />
      <section className="field">
        <div className="container">
          <h2>How it would work</h2>
          <ol className="steps">
            <li>
              <strong>You choose it in advance.</strong> &ldquo;If I send more than ₹1 lakh to someone new, or break a
              fixed deposit, check with my son first.&rdquo;
            </li>
            <li>
              <strong>You start a big transfer.</strong> Your bank asks Ruko one question: is this person on a long call
              with an unknown number right now?
            </li>
            <li>
              <strong>If yes, the bank holds the money for a short time</strong> and asks your son to call you. If
              everything is fine, the transfer goes through.
            </li>
          </ol>
        </div>
      </section>
      <section className="field field-white">
        <div className="container">
          <h2>Why a bank</h2>
          <ul className="rows">
            <li>Large amounts in these scams usually move by bank transfer or by breaking fixed deposits.</li>
            <li>Bank staff already stop some of these scams by hand, when someone at the branch notices.</li>
            <li>Ruko would share one yes-or-no answer with the bank, never your calls or messages.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
