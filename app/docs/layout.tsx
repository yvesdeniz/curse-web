import { Container } from "@/components/Container";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-56 lg:shrink-0">
          <DocsSidebar />
        </aside>
        <article className="min-w-0 flex-1">{children}</article>
      </div>
    </Container>
  );
}
