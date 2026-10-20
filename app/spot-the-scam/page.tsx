import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { t } from "@/lib/content";
import { SpotTheScam } from "./SpotTheScam";

export const metadata: Metadata = {
  title: t.spot.title,
  description: t.spot.metaDescription,
};

export default function SpotTheScamPage() {
  return (
    <>
      <PageHead
        title={t.spot.title}
        lead={t.spot.lead}
      />
      <section className="field">
        <div className="container">
          <SpotTheScam />
        </div>
      </section>
    </>
  );
}
