import type { Metadata } from "next";
import { DemoSwitcher } from "./DemoSwitcher";

export const metadata: Metadata = {
  title: "See Ruko's warning",
  description: "A mock-up of the warning Ruko shows during a risky call or for a scam message.",
};

export default function DemoPage() {
  return (
    <section className="section" style={{ borderTop: "none" }}>
      <div className="container">
        <h1>See the warning</h1>
        <p className="lead">
          This is a mock-up of what Ruko shows on an Android phone. Choose a situation and a setting to see how the
          warning changes.
        </p>
        <DemoSwitcher />
      </div>
    </section>
  );
}
