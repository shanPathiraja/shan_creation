import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, PrimaryButton, SecondaryButton } from "@/components/ui";
import { services, portfolio, site } from "@/lib/site";
import { iconMap, CheckIcon } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <Section className="flex flex-col items-center py-28 text-center">
          <div className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-white/70">Available for new projects</span>
          </div>

          <Image
            src="/logo.png"
            alt="Shan Creation"
            width={110}
            height={110}
            className="mb-8 drop-shadow-[0_0_40px_rgba(139,92,246,0.45)]"
            priority
          />

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl text-shadow-soft">
            Digital ideas,{" "}
            <span className="text-gradient">real impact.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Shan Creation designs, builds, and markets websites, apps, and brands for
            businesses that want to stand out online — all from one team.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton href="/contact">Start a Project</PrimaryButton>
            <SecondaryButton href="/portfolio">View Our Work</SecondaryButton>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-white/40">
            <span>Design</span>
            <span className="text-brand-purple">•</span>
            <span>Develop</span>
            <span className="text-brand-purple">•</span>
            <span>Grow</span>
          </div>
        </Section>
      </div>

      {/* Services overview */}
      <Section>
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mb-12 max-w-2xl text-3xl font-bold sm:text-4xl">
          One team for design, development, and growth.
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.slug}
                className="card rounded-2xl p-8 transition-colors hover:border-white/20"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-5 text-sm text-white/50">{service.short}</p>
                <ul className="space-y-2">
                  {service.points.slice(0, 3).map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Portfolio highlights */}
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">
              Sites built to be remembered.
            </h2>
          </div>
          <SecondaryButton href="/portfolio">See all work</SecondaryButton>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {portfolio.slice(0, 3).map((item) => (
            <a
              key={item.slug}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="group card overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
            >
              <div className={`h-40 w-full bg-gradient-to-br ${item.gradient}`} />
              <div className="p-6">
                <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                <p className="mb-3 text-sm text-white/50">{item.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="card relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-brand-gradient-radial" />
          <h2 className="relative mb-4 text-3xl font-bold sm:text-4xl">
            Got a project in mind?
          </h2>
          <p className="relative mx-auto mb-8 max-w-xl text-white/60">
            Tell us what you're building — website, app, brand, or all three. We'll get back
            to you within a day.
          </p>
          <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="/contact">Get In Touch</PrimaryButton>
            <Link href={site.facebook} target="_blank" className="text-sm font-medium text-white/60 hover:text-white">
              or message us on Facebook →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
