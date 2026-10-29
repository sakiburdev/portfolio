"use cache";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import TechIcon from "@/components/projects/TechIcon";
import prettyUrl from "@/lib/utils";
import { DATA, DESIGNATIONS, PERSONAL } from "@/lib/data";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "GitHub", href: DATA?.socialLinks?.github, slug: "github" },
  { label: "LinkedIn", href: DATA?.socialLinks?.linkedin, slug: "linkedin" },
  { label: "Facebook", href: DATA?.socialLinks?.facebook, slug: "facebook" },
].filter((social) => Boolean(social.href));

export default async function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            {PERSONAL?.name ?? "Sakibur Rahman"}<span className="text-amber-500">&nbsp;Rahman</span>
          </p>
          {DESIGNATIONS.length ? (
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              {DESIGNATIONS.join(" · ")}
            </p>
          ) : null}
          {SOCIALS.length ? (
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, slug }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${PERSONAL?.name ?? "Profile"} on ${label}`}
                  className="rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-600 transition hover:-translate-y-0.5 hover:border-amber-500/60 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-amber-400"
                >
                  <TechIcon name={label} icon={slug} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-600 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-zinc-400 dark:hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {PERSONAL?.email ? (
              <li>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 text-zinc-600 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-zinc-400 dark:hover:text-amber-400"
                >
                  <Mail size={16} aria-hidden="true" className="shrink-0" />
                  {PERSONAL.email}
                </a>
              </li>
            ) : null}
            {PERSONAL?.whatsappLink && PERSONAL?.whatsapp ? (
              <li>
                {/* Displayed exactly as provided in portfolio.json; the wa.me link is
                    configurable there too (whatsappLink field), easy to update later. */}
                <a
                  href={PERSONAL.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-600 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-zinc-400 dark:hover:text-amber-400"
                >
                  <MessageCircle size={16} aria-hidden="true" className="shrink-0" />
                  WhatsApp · {PERSONAL.whatsapp}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-400">
          <p>
            © {year} {PERSONAL?.name ?? "Sakibur Rahman"}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
