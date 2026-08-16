import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Shan Creation",
  description: "Start a project with Shan Creation.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <Section className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mb-6 text-4xl font-extrabold sm:text-5xl text-shadow-soft">Let's build something.</h1>
          <p className="mb-8 text-white/60">
            Tell us a bit about your project and we'll get back to you within a day.
            Prefer to chat first? Reach out directly.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${site.email}`}
              className="card flex items-center justify-between rounded-xl px-5 py-4 text-sm hover:border-white/20"
            >
              <span className="text-white/50">Email</span>
              <span className="font-medium">{site.email}</span>
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="card flex items-center justify-between rounded-xl px-5 py-4 text-sm hover:border-white/20"
            >
              <span className="text-white/50">Facebook</span>
              <span className="font-medium">Shan Creation</span>
            </a>
            <div className="card flex items-center justify-between rounded-xl px-5 py-4 text-sm">
              <span className="text-white/50">Based in</span>
              <span className="font-medium">{site.location}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <ContactForm />
        </div>
      </Section>
    </div>
  );
}
