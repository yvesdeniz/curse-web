"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Wordmark } from "@/components/Wordmark";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="rounded-md"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={site.inviteUrl} external size="md">
            Add to Discord
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={site.inviteUrl}
              external
              size="md"
              className="mt-2 w-full"
            >
              Add to Discord
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
