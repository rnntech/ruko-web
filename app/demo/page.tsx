import type { Metadata } from "next";
import { DemoSwitcher } from "./DemoSwitcher";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "See Ruko's warning",
  description: "A mock-up of the warnings Ruko shows during a risky call or for a scam message.",
};

export default function DemoPage() {
  return (
    <>
      <PageHead
        title="See the warning"
        lead="A mock-up of what Ruko shows on an Android phone. Choose a situation and who Ruko should involve to see how the warning changes."
      />
      <section className="field">
        <div className="container">
          <DemoSwitcher />
        </div>
      </section>
    </>
  );
}
