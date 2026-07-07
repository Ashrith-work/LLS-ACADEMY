import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-4 text-center">
      <h1 className="font-display text-5xl text-cream">404</h1>
      <p className="mt-3 text-muted">This page doesn't exist — but your course does.</p>
      <div className="mt-6">
        <ButtonLink href="/start" variant="primary">Find your course →</ButtonLink>
      </div>
      <Link href="/" className="mt-4 text-sm text-muted hover:text-cream">← Home</Link>
    </main>
  );
}
