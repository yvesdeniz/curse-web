import type { Metadata } from 'next';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/Button';
import { GlowBackground } from '@/components/GlowBackground';

export const metadata: Metadata = {
  title: 'Verification',
  robots: { index: false },
};

export default async function VerifiedPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string; error?: string }>;
}) {
  const { username, error } = await searchParams;
  const success = !!username && !error;

  return (
    <section className="relative isolate">
      <GlowBackground />
      <Container className="flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface/60 px-8 py-12 text-center backdrop-blur">
          {success ? (
            <>
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-accent/15">
                <CheckCircle2 className="size-7 text-accent" aria-hidden />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                You&rsquo;re verified!
              </h1>
              <p className="mt-3 text-muted">
                Welcome,{' '}
                <span className="font-medium text-accent">{username}</span>.
                <br />
                You can close this tab and return to Discord.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="size-7 text-red-400" aria-hidden />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Verification failed
              </h1>
              <p className="mt-3 text-muted">
                {error ?? 'An unexpected error occurred.'}
              </p>
              <div className="mt-8">
                <ButtonLink href="/" variant="ghost" size="md">
                  Go home
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
