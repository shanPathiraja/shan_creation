import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-20 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
      {children}
    </p>
  );
}

export function GlowBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="glow-blob absolute -top-32 -left-20 h-96 w-96 rounded-full bg-brand-blue" />
      <div className="glow-blob absolute top-40 right-0 h-80 w-80 rounded-full bg-brand-purple" />
      <div className="glow-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-pink" />
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-transform hover:scale-105"
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white"
    >
      {children}
    </Link>
  );
}
