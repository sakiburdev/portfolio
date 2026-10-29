import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT, PERSONAL } from "@/lib/data";
import cn from "@/lib/utils";

export default function About() {
  const paragraphs = (ABOUT?.paragraphs ?? []).filter(Boolean);
  const imageLeft = ABOUT?.imagePosition !== "right";
  const initials = (PERSONAL?.name ?? "SR")
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" />

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className={cn(!imageLeft && "lg:order-2")}>
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-amber-500/15 to-transparent blur-xl"
              />
              {/* aspect-[5/6]: slightly taller portrait frame than the previous
                  square; same width, radius, border and object-cover crop. */}
              <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-100 shadow-lg dark:border-zinc-800 dark:bg-zinc-800">
                {PERSONAL?.aboutImage ? (
                  <Image
                    src={PERSONAL.aboutImage}
                    alt={`Photograph of ${PERSONAL?.name ?? "Sakibur Rahman"}`}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 85vw"

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
            </div>
          </div>

          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-pretty text-base text-justify leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[15px] sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
