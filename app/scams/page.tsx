import type { Metadata } from "next";
import { ScamsPageBody } from "./ScamsPageBody";

export const metadata: Metadata = {
  title: "Scams going around in India",
  description:
    "Scams reported recently by the police, government and news outlets, updated weekly from official sources, with what to do from official advice. Share them with your family on WhatsApp.",
};

export const revalidate = 3600;

export default function ScamsPage() {
  return <ScamsPageBody page={1} />;
}
