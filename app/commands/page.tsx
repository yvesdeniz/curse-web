import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CommandList } from "@/components/CommandList";

export const metadata: Metadata = {
  title: "Commands",
  description:
    "Every curse command across verification, moderation, information, economy, and fun.",
};

export default function CommandsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Reference"
        title="Commands"
        subtitle="Every command curse ships with — all use the comma (,) prefix. Filter by category or search to find exactly what you need."
      />
      <div className="mt-10">
        <CommandList />
      </div>
    </Container>
  );
}
