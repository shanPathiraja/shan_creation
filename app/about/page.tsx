import type { Metadata } from "next";
import { Section, Eyebrow, PrimaryButton } from "@/components/ui";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About — Shan Creation",
  description: "Design, development, and marketing under one roof.",
};

const values = [
  {
    title: "Built to last",
    desc: "Maintainable, well-engineered code — not a bolted-together template that breaks in a year.",
  },
  {
    title: "Design with purpose",
    desc: "Every visual choice serves the brand and the visitor, not just aesthetics for their own sake.",
  },
  {
    title: "One point of contact",
    desc: "Design, development, and marketing from a single team that actually talks to itself.",
  },
  {
    title: "Honest communication",
    desc: "Clear timelines, clear pricing, and no disappearing after the deposit.",
  },
];

const stack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js / WebGL",
  "Node.js", "NestJS", "Flutter", "AWS", "Firebase",
];

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Section className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>About Shan Creation</Eyebrow>
            <h1 className="mb-6 text-4xl font-extrabold sm:text-5xl text-shadow-soft">
              Where design and engineering actually meet.
            </h1>
            <p className="mb-4 text-white/60">
              Shan Creation was started to close a gap a lot of small businesses run into:
              hiring a designer who can't build, or a developer who can't design — and
              ending up with a brand that doesn't feel cohesive.
            </p>
            <p className="mb-8 text-white/60">
              Behind Shan Creation is 4+ years of hands-on software engineering experience
              building production applications for real companies, paired with a genuine
              love for bold, modern, motion-driven design. That combination means projects
              get designed properly <em>and</em> built properly — by the same team.
            </p>
            <PrimaryButton href="/contact">Work With Us</PrimaryButton>
          </div>
          <div className="card rounded-3xl p-8">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/50">
              Toolkit
            </h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Section className="pt-0">
        <Eyebrow>How we work</Eyebrow>
        <h2 className="mb-12 max-w-xl text-3xl font-bold sm:text-4xl">What you can expect.</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="card flex gap-4 rounded-2xl p-6">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                <CheckIcon className="h-3.5 w-3.5 text-white" />
              </span>
              <div>
                <h3 className="mb-1 font-semibold">{v.title}</h3>
                <p className="text-sm text-white/50">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
