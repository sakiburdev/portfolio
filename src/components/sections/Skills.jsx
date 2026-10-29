import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/projects/TechIcon";
import { SKILLS } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I use to design, build, and ship web applications."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILLS.map((category) =>
            !category?.category ? null : (
              <div
                key={category.category}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <h3 className="flex items-center gap-2.5 text-lg font-semibold text-zinc-900 dark:text-white">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-500" />
                  {category.category}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {(category.skills ?? []).map((skill) =>
                    !skill?.name ? null : (
                      <li
                        key={skill.name}
                        className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-200"
                      >
                        <TechIcon
                          name={skill.name}
                          icon={skill.icon}
                          className="h-4 w-4 text-zinc-600 dark:text-zinc-300"
                        />
                        {skill.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
