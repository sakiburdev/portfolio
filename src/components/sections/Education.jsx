import SectionHeading from "@/components/ui/SectionHeading";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="My academic background, from secondary school to university."
        />

        {EDUCATION.length ? (
          <ol className="relative ml-2 max-w-3xl space-y-10 border-l-2 border-zinc-200 pl-8 dark:border-zinc-800">
            {EDUCATION.map((record, index) =>
              !record ? null : (
                <li key={`${record.period}-${record.degree ?? index}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-[3px] border-amber-500 bg-white dark:bg-zinc-950"
                  />
                  {record.period ? (
                    <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      {record.period}
                    </span>
                  ) : null}
                  <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                    {record.degree}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {record.institution}
                  </p>
                  {record.department ? (
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {record.department}
                    </p>
                  ) : null}
                </li>
              )
            )}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
