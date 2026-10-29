import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import TechIcon from "@/components/projects/TechIcon";
import TypingTitle from "./TypingTitle";
import { DATA, DESIGNATIONS, PERSONAL } from "@/lib/data";

const SOCIALS = [
  { label: "GitHub", href: DATA?.socialLinks?.github, slug: "github" },
  { label: "LinkedIn", href: DATA?.socialLinks?.linkedin, slug: "linkedin" },
  { label: "Facebook", href: DATA?.socialLinks?.facebook, slug: "facebook" },
].filter((social) => Boolean(social.href));

// Short intro derived only from the supplied About text — no invented facts.
const INTRO =
  "I build clean, modern and user-friendly websites with careful attention to design and detail — currently sharpening my skills through Programming Hero.";

export default function Hero() {
  const initials = (PERSONAL?.name ?? "SR")
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-zinc-200/70 dark:border-zinc-800/70"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-zinc-400/10 blur-3xl dark:bg-zinc-700/20"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="order-2 lg:order-none">
          <p
            className="animate-fade-up text-sm font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400"
            style={{ animationDelay: "0ms" }}
          >
            Hello, I&apos;m
          </p>
          <h1
            className="animate-fade-up mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {PERSONAL?.name ?? "Sakibur Rahman"}<span>&nbsp;Rahman</span>
          </h1>
          <div
            className="animate-fade-up mt-4 text-xl font-medium text-amber-600 dark:text-amber-400 sm:text-2xl"
            style={{ animationDelay: "160ms" }}
          >
            <TypingTitle titles={DESIGNATIONS.length ? DESIGNATIONS : undefined} />
          </div>
          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {INTRO}
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3.5"
            style={{ animationDelay: "320ms" }}
          >
            <Button href="/projects">
              View My Projects
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            {/* Real PDF served from public/resume.pdf (URL: /resume.pdf).
                Use download={false} to open it in the browser tab instead. */}
            <Button
              href="/resume.pdf"
              variant="secondary"
              download="Sakibur-Rahman-Resume.pdf"
            >
              Download Resume
            </Button>
          </div>

          {SOCIALS.length ? (
            <div
              className="animate-fade-up mt-9 flex items-center gap-4"
              style={{ animationDelay: "400ms" }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Find me on
              </span>
              <div className="flex gap-3">
                {SOCIALS.map(({ label, href, slug }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${PERSONAL?.name ?? "Profile"} on ${label}`}
                    className="rounded-full border border-zinc-200 bg-white p-2.5 text-zinc-600 transition hover:-translate-y-0.5 hover:border-amber-500/60 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-amber-400"
                  >
                    <TechIcon name={label} icon={slug} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Portrait — shown ABOVE the text on mobile/tablet (order), beside it on lg */}
        <div
          className="animate-fade-up relative mx-auto w-60 sm:w-72 lg:order-none lg:w-80"
          style={{ animationDelay: "250ms" }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-amber-500/20 via-zinc-400/5 to-transparent blur-2xl dark:via-transparent"
          />
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-100 shadow-xl dark:border-zinc-800 dark:bg-zinc-800">
            {PERSONAL?.profileImage ? (
              <Image
                src={PERSONAL.profileImage}
                alt={`Portrait of ${PERSONAL?.name ?? "Sakibur Rahman"}`}
                fill
                priority
                sizes="(min-width: 1024px) 320px, 70vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400/80 to-amber-600/80 text-6xl font-semibold text-white"
              >
                {initials}
              </div>
            )}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/5 dark:ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}
