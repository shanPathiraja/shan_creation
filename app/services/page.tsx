import type { Metadata } from "next";
import { Section, Eyebrow, PrimaryButton } from "@/components/ui";
import { services, pricing } from "@/lib/site";
import { iconMap, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Services — Shan Creation",
  description: "Web & graphic design, development, and digital marketing services.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Section className="text-center">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mx-auto max-w-2xl text-4xl font-extrabold sm:text-5xl text-shadow-soft">
            Everything you need to launch and grow online.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            Most businesses juggle a designer, a developer, and a marketer separately. We
            handle all three as one team, so everything actually fits together.
          </p>
        </Section>
      </div>

      <Section className="pt-0">
        <div className="space-y-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div key={service.slug} className="card grid gap-8 rounded-2xl p-8 md:grid-cols-3 md:p-10">
                <div>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">{service.title}</h2>
                  <p className="text-sm text-white/50">{service.short}</p>
                </div>
                <div className="md:col-span-2">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mb-3 max-w-xl text-3xl font-bold sm:text-4xl">
          Straightforward packages, no surprises.
        </h2>
        <p className="mb-12 max-w-xl text-white/50">
          Every project is a little different — these are starting ranges. We'll give you
          an exact quote after a quick chat about what you need.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className={`card relative flex flex-col rounded-2xl p-6 ${
                tier.highlighted ? "border-brand-purple/60" : ""
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="mb-1 text-lg font-semibold">{tier.name}</h3>
              <p className="mb-4 text-sm text-white/50">{tier.description}</p>
              <p className="mb-6 text-xl font-bold text-gradient">{tier.price}</p>
              <ul className="mt-auto space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/60">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <PrimaryButton href="/contact">Get a Custom Quote</PrimaryButton>
        </div>
      </Section>
    </>
  );
}
