import { Mail, MessageCircle, Smartphone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/projects/TechIcon";
import ContactForm from "./ContactForm";
import prettyUrl from "@/lib/utils";
import { DATA, PERSONAL } from "@/lib/data";

function prettySocial(label, url) {
  return prettyUrl(url) || label;
}

const CHANNELS = [
  {
    key: "email",
    label: "Email",
    href: PERSONAL?.email ? `mailto:${PERSONAL.email}` : undefined,
    value: PERSONAL?.email,
    Icon: Mail,
    slug: undefined,
    internal: true,
  },
  {
    key: "github",
    label: "GitHub",
    href: DATA?.socialLinks?.github,
    value: prettySocial("GitHub", DATA?.socialLinks?.github),
    Icon: undefined,
    slug: "github",
    internal: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: DATA?.socialLinks?.linkedin,
    value: prettySocial("LinkedIn", DATA?.socialLinks?.linkedin),
    Icon: undefined,
    slug: "linkedin",
    internal: false,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: DATA?.socialLinks?.facebook,
    value: prettySocial("Facebook", DATA?.socialLinks?.facebook),
    Icon: undefined,
    slug: "facebook",
    internal: false,
  },
].filter((channel) => Boolean(channel.href) && Boolean(channel.value));

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <SectionHeading
              title="Contact Me"
              subtitle="Have a project, idea, or opportunity? Reach out through any channel below or use the form."
            />
            <ul className="space-y-3.5">
              {CHANNELS.map(({ key, label, href, value, Icon, slug, internal }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={internal ? undefined : "_blank"}
                    rel={internal ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-amber-500/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <span className="shrink-0 rounded-xl bg-amber-500/10 p-2.5 text-amber-600 transition group-hover:scale-105 dark:text-amber-400">
                      {slug ? (
                        <TechIcon name={label} icon={slug} className="h-[18px] w-[18px]" />
                      ) : (
                        <Icon size={18} aria-hidden="true" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
              <Smartphone size={14} aria-hidden="true" />
              Typically replies within a day.
            </p>
          </div>

          <ContactForm email={PERSONAL?.email ?? ""} />
        </div>
      </div>
    </section>
  );
}
