import type { Metadata } from "next";
import { Section, Eyebrow, PrimaryButton } from "@/components/ui";
import { portfolio } from "@/lib/site";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Portfolio — Shan Creation",
  description: "Selected work in web design, development, and product design.",
};

export default function PortfolioPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Section className="text-center">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="mx-auto max-w-2xl text-4xl font-extrabold sm:text-5xl text-shadow-soft">
            Work built to be remembered, not just seen.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            A mix of client and personal projects spanning motion-driven brand sites,
            SaaS products, and mobile apps.
          </p>
        </Section>
      </div>

      <Section className="pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          {portfolio.map((item) => (
            <a
              key={item.slug}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="group card overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
            >
              <div className={`relative flex h-52 w-full items-end bg-gradient-to-br ${item.gradient} p-6`}>
                <span className="text-2xl font-bold text-white drop-shadow">{item.title}</span>
              </div>
              <div className="p-6">
                <p className="mb-2 text-sm font-medium text-brand-purple">{item.tagline}</p>
                <p className="mb-4 text-sm text-white/60">{item.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 group-hover:text-white">
                  Visit site <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <div className="card relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-brand-gradient-radial" />
          <h2 className="relative mb-4 text-3xl font-bold sm:text-4xl">
            Like what you see?
          </h2>
          <p className="relative mx-auto mb-8 max-w-xl text-white/60">
            Let's build something for your business that looks this good.
          </p>
          <div className="relative">
            <PrimaryButton href="/contact">Start a Project</PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
