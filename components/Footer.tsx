import Link from "next/link";
import { site, docsNav } from "@/lib/site";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col gap-10 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Wordmark className="text-xl" />
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {site.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-faint">
              Product
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/changelog"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-faint">
              Docs
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {docsNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>Not affiliated with Discord Inc.</p>
      </Container>
    </footer>
  );
}
