import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <Image src="/logo.png" alt="Shan Creation logo" width={32} height={32} />
              <span className="font-display text-base font-bold">
                SHAN <span className="text-gradient">CREATION</span>
              </span>
            </div>
            <p className="max-w-sm text-sm text-white/50">{site.description}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Site</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Get in touch</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
              </li>
              <li>
                <a href={site.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
                  Facebook Page
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Shan Creation. Design · Develop · Grow.
        </div>
      </div>
    </footer>
  );
}
